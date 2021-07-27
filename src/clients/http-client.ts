import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import JSONbig from 'json-bigint';
import os from 'os';
import https from 'https';

const packageJson = require('../../package.json');

const networkInterfaces = os.networkInterfaces();

const clientIp = `eth0` in networkInterfaces && Array.isArray(networkInterfaces.eth0) ? networkInterfaces.eth0[0] : null;
const userAgent = `CigApiClient/${packageJson.version}`;

export default (apiUrl: string, apiUser: string, token: string): AxiosInstance => {
	const axiosConfig: AxiosRequestConfig = {
		baseURL: apiUrl,
		withCredentials: true,
		headers: {
			Accept: 'application/json',
			'x-access-token': token,
			'x-access-consumer': apiUser,
			...(clientIp && { 'CLIENT-IP': clientIp }),
			...(clientIp && { 'X-REAL-IP': clientIp }),
			// Override the default Axios user-agent and instead pass through the requesting client's UA
			...(userAgent && { 'User-Agent': userAgent }),
		},
		transformResponse: data => JSONbig.parse(data),
		maxContentLength: Infinity,
		// Allow connecting to self-signed certificates
		httpsAgent: new https.Agent({
			rejectUnauthorized: false,
		}),
	};

	const axiosClient = axios.create(axiosConfig);

	return axiosClient;
};
