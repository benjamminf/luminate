import Lum from './lum'
import Config from './config'

import Toggler from './modules/toggler'
import Selector from './modules/selector'

Lum.config = Config

Lum.register(Toggler)
Lum.register(Selector)

window.Lum = Lum
