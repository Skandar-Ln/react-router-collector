## react-router 接入百度统计

```js
import {createRouteCollector} from 'react-router-collector';

// create history, then
history.listen(createRouteCollector(history, '[prefix]'));
```