import { AxiosInstance } from 'axios';

export type RequestClient = AxiosInstance;

export type GenericObject = { [key: string]: any };

export type ApiMethod = (url: string | number | GenericObject, params?: GenericObject) => any;

export interface ApiRequest {
	get: ApiMethod;
	post: ApiMethod;
	head: ApiMethod;
	patch: ApiMethod;
	put: ApiMethod;
	delete: ApiMethod;
}

export interface ApiProxy {
	messages?: ApiRequest;
	user?: ApiRequest;
	// [key: string]: any;
}

export type ApiClient = (apiUrl?: string, apiUser?: string, apiKey?: string, apiSecret?: string) => ApiProxy;
