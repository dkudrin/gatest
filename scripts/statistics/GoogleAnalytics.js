import {
  gaTrackingID,
  gaCategory,
  gaLabel
} from './config'

let loaded = false

const checkLimit = 10
let counter = 0
const checkGoogleAnalyticsIsLoaded = (resolve) => {
  if (window.ga && window.ga.create) {
    resolve()
  } else {
    counter++
    if (counter < checkLimit) {
      setTimeout(() => {
        checkGoogleAnalyticsIsLoaded(resolve)
      }, 200)
    } else {
      resolve()
    }
  }
}

const loadGoogleAnalytics = () => {
  if (!loaded) {
    /* eslint-disable */
    loaded = new Promise((resolve) => {
      checkGoogleAnalyticsIsLoaded(resolve)
    });

    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
    /* eslint-enable */
  }
  return loaded
}

const createGoogleAnalyticsCounter = () => {
  window.ga('create', gaTrackingID, 'auto')
}

export default class GoogleAnalytics {
  init () {
    this.loaded = loadGoogleAnalytics().then(() => {
      createGoogleAnalyticsCounter()
    })
  }

  send (event) {
    return this.loaded.then(() => {
      return new Promise((resolve, reject) => {
        if (typeof window.ga === 'function') {
          window.ga('send', 'event', {
            eventCategory: gaCategory,
            eventAction: event.action,
            eventLabel: event.label || gaLabel,
            hitCallback: resolve,
            hitCallbackFail: reject
          })
        }
      })
    })
  }

  pageview (page) {
    console.log('GA pageview sended')
    return this.loaded.then(() => {
      if (typeof window.ga === 'function') {
        window.ga('set', 'page', page)
        window.ga('send', 'pageview')
      }
    })
  }
}