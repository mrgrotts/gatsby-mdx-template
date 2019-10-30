const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

const toKebabCase = string =>
  string &&
  string
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('-')

const createTagSlug = tag => `/resources/route-nation/tags/${toKebabCase(tag)}`

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  try {
    const query = await graphql(`
      query {
        allMdx {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                tags
              }
            }
          }
        }
      }
    `)

    if (query.errors) {
      reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
    }

    const {
      data: {
        allMdx: { edges }
      }
    } = query

    edges.forEach(({ node }, index) => {
      createPage({
        component: path.resolve(
          `${__dirname}/src/templates/resource.template.js`
        ),
        path: node.fields.slug,
        context: {
          id: node.id,
          slug: node.fields.slug
        }
      })
    })

    let tags = []
    edges.forEach(({ node }) => {
      if (node && node.frontmatter && node.frontmatter.tags) {
        tags = [...tags, ...node.frontmatter.tags]
      }
    })

    tags.forEach(tag =>
      createPage({
        path: createTagSlug(tag),
        component: path.resolve(`${__dirname}/src/templates/tag.template.js`),
        context: { tag }
      })
    )
  } catch (error) {
    console.error(error)
  }
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'Mdx') {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: 'slug',
      node,
      value
    })

    if (node.frontmatter.tags) {
      const tagSlugs = node.frontmatter.tags.map(createTagSlug)

      createNodeField({ name: `tagSlugs`, node, value: tagSlugs })
    }
  }
}
