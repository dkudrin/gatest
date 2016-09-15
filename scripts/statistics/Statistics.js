import GoogleAnalytics from './GoogleAnalytics'
import YaMetrika from './YaMetrika'

export default class Statistics {

  constructor() {
      this.counters = {
      google: new GoogleAnalytics(),
      yandex: new YaMetrika()
    }
  }

  init () {
    for (const name in this.counters) {
      this.counters[name].init()
    }

    this._initialized = Promise.resolve(true)
  }

  event (event) {
    const counters = Object.values(this.counters)
    return Promise.all(counters.map((counter) => {
      return counter.send(event)
    }))
  }

  pageview (page) {
    const counters = Object.values(this.counters)
    return Promise.all(counters.map((counter) => {
      return counter.pageview(page)
    }))
  }
}