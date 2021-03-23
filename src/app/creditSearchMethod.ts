/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import axios from "axios"



function api(path: string, body: any) {
	return new Promise((resolve, reject) => {
		axios.post(`https://developer-test-service-2vfxwolfiq-nw.a.run.app/${path}`, body).then(res => {
			resolve(res.data);
		}).catch(err => {
			reject(err)
		})
	})
}


export default async (req: Request, res: Response): Promise<void> => {

	let totalCreditorValue = 0, securedCreditorValue = 0, unsecuredCreditorValue = 0, qualifies = false;


	const filter = {
		postcode: req.body.postcode,
		address1: "",
		address2: ""
	};

	const matches: string = req.body.address.match(/(Flat [0-9]+) (.*)/);
	
	if (matches) {
		filter.address1 = matches[1]; filter.address2 = matches[2];
	} else {
		filter.address1 = req.body.address;
	}

	await api("addresses", filter).then((addresses: any) => {
		addresses.forEach(address => {
			api("creditors", {
				addressId: address.id,
				surname: req.body.surname
			}).then((creditors: any) => {

				let manyUnsecured = 0; 

				creditors.forEach(creditor => {

					if (creditor.secured) { 
						securedCreditorValue += creditor.value;
					} else {
						unsecuredCreditorValue += creditor.value; manyUnsecured++;
					}

					totalCreditorValue += creditor.value;

					if (manyUnsecured >= 2 && (unsecuredCreditorValue / 100) > 5000) {
						qualifies = true;
					}

				})

			}).catch(() => {
				console.log("Error while fetching creditors!"); res.status(500).end();
			}).finally(() => {
				res.json({
					totalCreditorValue,
					securedCreditorValue,
					unsecuredCreditorValue,
					qualifies
				}).end();
			})
		});
	}).catch(() => { 
		console.error("Error while fetching addresses!"); res.status(500).end();
	})

};