const siteConfig = require('./site-config');
const {createProxyMiddleware} = require('http-proxy-middleware');
require('dotenv').config({});

module.exports = {
  siteMetadata: {
    ...siteConfig,
  },
  developMiddleware: app => {
    app.use(
      '/.netlify/functions/',
      createProxyMiddleware({
        target: 'http://localhost:9000',
        pathRewrite: {
          '/.netlify/functions/': '',
        },
      })
    );
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-offline',
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1.0725rem',
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-smartypants',
        ],
      },
    },
    'gatsby-plugin-eslint',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/content`,
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-webpack-size',
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /images\/.*\.svg$/,
        },
      },
    },
    {
      resolve: 'gatsby-source-instagram',
      options: {
        username: '38256945', // harveyives, window._sharedData.entry_data.ProfilePage[0].graphql.user.id on profile
        maxPosts: 12,
      },
    },
    '@chakra-ui/gatsby-plugin',
    {
      resolve: 'gatsby-source-github-api',
      options: {
        token: process.env.GITHUB_ACCESS_TOKEN,
        variables: {},
        graphQLQuery: `
          {
            user(login: "harveyives") {
              pinnedItems(first: 6) {
                edges {
                  node {
                    ... on Repository {
                      id
                      name
                      description
                      primaryLanguage {
                        name
                      }
                      url
                      object(expression: "master:readme.md") {
                        ... on Blob {
                          text
                        }
                        ... on Tree {
                          id
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        `,
      },
    },
  ],
};
