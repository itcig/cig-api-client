export default class ApiProxy {
	constructor(target: any, handler: ProxyHandler<any>) {
		return new Proxy(target, handler);
	}
}
