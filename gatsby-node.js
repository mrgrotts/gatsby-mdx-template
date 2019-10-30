const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

const toKebabCase = string =>
  string &&
  string
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('-')

const createResourcesPage = (node, createPage) => {
  const component = path.resolve(
    `${__dirname}/src/templates/resource.template.js`
  )

  return createPage({
    component,
    path: node.fields.slug,
    context: {
      id: node.id,
      slug: node.fields.slug
    }
  })
}

const createTagSlug = tag => `/resources/route-nation/tags/${toKebabCase(tag)}`

const createTagPages = (tags, createPage) => {
  const component = path.resolve(`${__dirname}/src/templates/tag.template.js`)

  tags.forEach(tag =>
    createPage({
      path: createTagSlug(tag),
      component,
      context: { tag }
    })
  )
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  // Destructure the createPage function from the actions object
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

    // Create mdx pages.
    const {
      data: {
        allMdx: { edges }
      }
    } = query

    // you'll call `createPage` for each result
    edges.forEach(({ node }, index) => {
      createResourcesPage(node, createPage)
    })

    let tags = []
    edges.forEach(({ node }) => {
      if (node && node.frontmatter && node.frontmatter.tags) {
        tags = [...tags, ...node.frontmatter.tags]
      }
    })

    createTagPages(tags, createPage)
  } catch (error) {
    console.error(error)
  }
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  // you only want to operate on `Mdx` nodes. If you had content from a
  // remote CMS you could also check to see if the parent node was a
  // `File` node here
  if (node.internal.type === 'Mdx') {
    const value = createFilePath({ node, getNode })
    console.log('value: ', value)

    createNodeField({
      // Name of the field you are adding
      name: 'slug',
      // Individual MDX node
      node,
      // Generated value based on filepath with "blog" prefix. you
      // don't need a separating "/" before the value because
      // createFilePath returns a path with the leading "/".
      value: `/resources/route-nation${value}`
    })

    if (node.frontmatter.tags) {
      const tagSlugs = node.frontmatter.tags.map(createTagSlug)
      createNodeField({ name: `tagSlugs`, node, value: tagSlugs })
    }
  }
}
