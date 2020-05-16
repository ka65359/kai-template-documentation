## Project Best Practices

#### Components
- Avoid using `store.getState()` where possible. Use a `selector` function or `mapStateToProps` in the `connect` function
- Don't call `selectors` from `render`/`View` or main componenent definition code. Use `mapStateToProps` or have properties passed into the component from the parent. `Selectors` should only be used when you have direct access to `state` (i.e. in `mapStateToProps` or `reducers`)
- Don't update state or call a function that updates state from the `render`/`View` or main component definition code. Use callbacks triggered by actions on the UI or in `componentWillMount` to avoid unnecessary re-renders

#### Performance
- Avoid using `cloneDeep` unless you absolutely need it, and then only on a small dataset. Never something as large as the entire `state` object
- Don't update the DOM without using `React` methods. Never use `document.createElement()` and DOM manipulation like setting `document.getElementById("someID")`'s `innerHTML` or `appendChild()`. Use `ReactDOM.render()` or a function returning a JSX element instead. DOM's created outside of React's context are not garbage collected!
    - `const buildDiv = (content) => { return (<div>{content}</div>); };`
    - `return (<div>{Array(7).fill(null).map((item, index) => { buildDiv(index); }); }</div>); // render 7 divs`
- Only use state/eventListeners in component `lifecycle` functions. Every listener should be added in `componentWillMount()` and removed in `componentWillUnmount()` to avoid duplicated and memory leaks from non-garbage collected listeners

#### General
- Avoid `setTimeouts` used to wait for an element to render or some other asyncronous action to complete before performing another action. These are generally not going to behave the same way across multiple systems. Use `Promises` and `async` as needed.


#### Breaking up large PRs
- Each new widget delivered separately, preferably with PRs for single bits of functionality
- Feature flags, styles, and localization strings can be added separately and safely merged quickly
- Store `reducers` and associated `action` definitions delivered separately from store `actions` requiring REST calls
    - These should be delivered with tests before any component that uses them
- Functionality relying only on previously existing components vs. functionality that requires new components
- Functions that can be reused delivered with tests to `Library`
