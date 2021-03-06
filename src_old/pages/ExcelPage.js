import {Page} from '@core/Page'

import {Excel} from '@/components/excel/Excel'
import {Header} from '@/components/header/Header'
import {Toolbar} from '@/components/toolbar/Toolbar'
import {Formula} from '@/components/formula/Formula'
import {Table} from '@/components/table/Table'
import {createStore} from '@core/createStore'
import {rootReduser} from '@/redux/rootReduser'
import {storage, debounce} from '@/core/utils'
import {initialState} from '@/redux/initialState'

export class ExcelPage extends Page {
  getRoot() {
    console.log(this.params);
    const store = createStore(rootReduser, initialState)

    const stateListener = debounce(state => {
      console.log('App state', state)
      storage('excel-state', state)
    }, 300)

    store.subscribe(stateListener)

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store
    })

    return this.excel.getRoot()
  }

  afterRender() {
    this.excel.init()
  }

  destroy() {
    this.excel.destroy()
  }
}
