import Lum from './lum'
import Config from './config'

import Toggler from './modules/toggler'

Lum.config = Config

Lum.register(Toggler)

window.Lum = Lum
