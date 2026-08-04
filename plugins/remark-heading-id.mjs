// Reads the `{/* #slug */}` comment that content-plugin injects at the end of a
// heading (from the author-written `{#slug}`) and turns it into the heading's id.
// Runs as a remark plugin inside the MDX pipeline.
//
// ponytail: hand-rolled tree walk instead of pulling in unist-util-visit — one
// dependency saved for ~10 lines. Swap to unist-util-visit if traversal needs grow.

const ID_RE = /^\s*\/\*\s*#([A-Za-z0-9][A-Za-z0-9-]*)\s*\*\/\s*$/

export function remarkHeadingId() {
  return (tree) => walk(tree)
}

function walk(node) {
  if (node.type === 'heading' && Array.isArray(node.children) && node.children.length) {
    const last = node.children[node.children.length - 1]
    const match = last && last.type === 'mdxTextExpression' && last.value.match(ID_RE)
    if (match) {
      node.data = node.data || {}
      node.data.hProperties = { ...(node.data.hProperties || {}), id: match[1] }
      node.children.pop()
      const prev = node.children[node.children.length - 1]
      if (prev && prev.type === 'text') prev.value = prev.value.replace(/\s+$/, '')
    }
  }
  if (Array.isArray(node.children)) for (const child of node.children) walk(child)
}
