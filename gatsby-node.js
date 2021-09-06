const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');
const { createRemoteFileNode } = require("gatsby-source-filesystem")
const path = require(`path`);
const crypto = require('crypto');

exports.onCreateWebpackConfig = ({
                                   stage,
                                   getConfig,
                                   rules,
                                   loaders,
                                   actions,
                                 }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      plugins: [
        new DirectoryNamedWebpackPlugin({
          exclude: /node_modules/,
        }),
      ],
    },
  });
};

exports.onCreateNode = async ({node, actions, createNodeId, cache }) => {
  const {createNode, createParentChildLink } = actions;
  if (node.internal.type === `GithubData`) {
    node.data.user.pinnedItems.nodes.map(async function (projectData) {
      console.log(projectData)

      let project = {
        id: projectData.id,
        slug: `/projects/${projectData.name}`,
        data: {
          ...projectData,
          title: getTitleFromFirstLineOfMd(projectData.object.text),
        },
        parent: null,
        children: [],
        internal: {
          mediaType: 'text/markdown',
          content: projectData.object.text,
          type: `GithubPinnedRepository`,
          contentDigest: crypto
            .createHash(`md5`)
            .update(JSON.stringify(projectData))
            .digest(`hex`),
        }
      };
      createNode(project);

      let fileNode = await createRemoteFileNode({
        url: projectData.openGraphImageUrl, // string that points to the URL of the image
        parent: projectData.id,
        createNode, // helper function in gatsby-node to generate the node
        createNodeId, // helper function in gatsby-node to generate the node id
        cache,
      });
      createParentChildLink({ parent: project, child: fileNode })
      projectData.featuredImg___NODE = fileNode.id
    });
  }
};

function getTitleFromFirstLineOfMd(md) {
  const regExString = new RegExp("#.(.*)\\n"); //set ig flag for global search and case insensitive
  const testRE = regExString.exec(md);
  return testRE && testRE.length > 1 ? testRE[1] : null;
}

exports.createPages = async ({graphql, actions}) => {
  const {createPage} = actions;
  const result = await graphql(`
    {
      allGithubPinnedRepository {
        edges {
          node {
            data {
              description
              id
              name
              object {
                text
              }
              openGraphImageUrl
              primaryLanguage {
                name
              }
              url
            }
            slug
          }
        }
      }
    }
  `);
  result.data.allGithubPinnedRepository.edges
    .forEach(({node}) => {
      createPage({
        path: node.slug,
        component: path.resolve(`./src/templates/project.js`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: node.slug,
        },
      });
    });
};
