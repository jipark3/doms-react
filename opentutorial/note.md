# update & delete 구현

## update 구현하기
- updateContent 컴포넌트를 createContent 컴포넌트와 같은 형식으로 만들어준다.

## state를 이용한 직접 수정 불가 이슈
```js
...
render() {
	...
	<p>
	  <input
	    type="text"
	    placeholder="title"
	    name="title"
	    value={this.props.data.title}	//warning
	  ></input>
	</p>
...
}
```
위에서 props의 값은 readonly 이기 떄문에 warning 에러가 발생한다. 

이를 해결하기 위해서 props를 받아와서 state화 해준다. 위 코드가 속해있는 class 상단에 아래와 같은 생성자를 추가해준다. 그러고나서 위 `this.props.data.title` 부분을 state화 한 state를 가져와서 아래와 같이 `this.state.title` 로 수정해준다.
```js
class UpdateContent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: this.props.data.title
		}
	}
}

render() {
	...
	<p>
	  <input
	    type="text"
	    placeholder="title"
	    name="title"
			value={this.state.title}	//warning
			//state를 이용해서 수정
	  ></input>
	</p>
...
}
```

하지만 이렇게 해도 readonly 가 되는 것은 변함이 없고 똑같은 에러가 발생한다. 그리고 에러 메세지에는 onChange 핸들러를 추가해야 한다고 말한다.

```js
render() {
	...
	<p>
	  <input
	    type="text"
	    placeholder="title"
	    name="title"
			value={this.state.title}
			onChange={function(e){
				this.setState({title: e.target.value});
			}.bind(this)}
	  ></input>
	</p>
...
}
```
결국 state화 한 이유는 이렇게 onChange 핸들러를 추가해서 setState를 사용하기 위함이었다. onChange 핸들러를 추가해서 state를 클래스 내부에서 수정하는 것은 가능하기 때문에 이와 같이 state를 수정해주면 수정된 `this.state.title` 이 value 프로퍼티에 들어가면서 수정될때마다 value 프로퍼티가 갱신이 된다. 





