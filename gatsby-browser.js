/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

// You can delete this file if you're not using it

import "./src/styles/global.scss"

import 'bootstrap/dist/css/bootstrap.min.css';


export function onServiceWorkerUpdateReady() {
  window.location.reload()
}
