const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');
const path = require(`path`);
const {createFilePath} = require(`gatsby-source-filesystem`);
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

exports.onCreateNode = ({node, actions}) => {
  const {createNode, deleteNode} = actions;
  if (node.internal.type === `GithubData`) {
    node.data.user.pinnedItems.nodes.map(it => {
      createNode({
        id: it.id,
        slug: `/projects/${it.name}`,
        data: it,
        parent: null,
        children: [],
        internal: {
          type: `GithubPinnedRepository`,
          contentDigest: crypto
            .createHash(`md5`)
            .update(JSON.stringify(it))
            .digest(`hex`),
        }
      });
    });
  }
};

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
