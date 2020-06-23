React 新特性 Hooks 重构去哪儿网火车票 PWA

该项目利用 [React](https://reactjs.org)、[Redux](https://redux.js.org/)等技术重构去哪儿网火车票，重度使用 [Hooks](https://reactjs.org/docs/hooks-intro.html) 重写视图组件。

## 用法

```sh
npm start
```

# 任务拆解

-   React 视觉组件的拆分
-   redux store 状态设计
-   redux action/reducer 设计

## index 组件

从 actions 里边获取 showCitySelector 和 exchangeFromTo，然后使用

```jsx
// ....
import { exchangeFromTo, showCitySelector } from './actions';

function App(props) {
    // .....

    const doExchangeFromTo = useCallback(() => {
        dispatch(exchangeFromTo());
    }, []);

    const doShowCitySelector = useCallback(m => {
        dispatch(showCitySelector(m));
    }, []);

    //...
    return (
        <div>
            <div className="header-wrapper">
                <Header title="火车票" onBack={onBack} />
            </div>
            <Journey
                from={from}
                to={to}
                exchangeFromTo={doExchangeFromTo()}
                showCitySelector={doShowCitySelector}
            />
        </div>
    );
}
```

和下面的代码一样

```jsx
// ....
import { exchangeFromTo, showCitySelector } from './actions';

function App(props) {
    // .....

    const cbs = useMemo(() => {
        return bindActionCreators(
            {
                exchangeFromTo,
                showCitySelector,
            },
            dispatch
        );
    }, []);

    //...
    return (
        <div>
            <div className="header-wrapper">
                <Header title="火车票" onBack={onBack} />
            </div>
            <Journey from={from} to={to} {...cbs} />
        </div>
    );
}
```

### 使用 classnames npm 包

```jsx
export function App(props) {
    return (
        <div
            className={['city-selector hidden', !show && 'hidden']
                .filter(Boolean)
                .join(' ')}
        ></div>
    );
}
```
