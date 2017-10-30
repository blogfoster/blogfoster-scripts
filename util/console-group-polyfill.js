// Minimal polyfill for Node versions that do not support console.group*
// functions. We will improve this polyfill later so that it matches the
// behaviour of Node 8.
//
// https://github.com/nodejs/node/commit/a46e59d52d
// https://github.com/nodejs/node/commit/af11867b41
if (!console.group) {
  console.group = console.log;
  console.groupCollapsed = console.log;
  console.groupEnd = () => {};
}
