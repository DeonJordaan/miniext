import { useCallback, useState } from 'react';

const FetchAirtable = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const sendRequest = useCallback(
		async (
			requestConfig: {
				apiKey: any;
				baseId: any;
				queryData: any;
				queryField: any;
				baseName: any;
			},
			applyData: (arg0: any) => void
		) => {
			setIsLoading(true);
			setError(null);

			try {
				const Airtable = require('airtable');

				const base = new Airtable({
					apiKey: requestConfig.apiKey,
				}).base(requestConfig.baseId);

				const queryData = requestConfig.queryData;
				const queryField = requestConfig.queryField;

				const returnedData = await base(requestConfig.baseName)
					.select({
						filterByFormula: `FIND(${queryField}, '${queryData}')`,
					})
					.firstPage();

				applyData(returnedData);
			} catch (error) {
				if (error instanceof Error) {
					setError(error.message);
				}
			}
		},
		[]
	);

	return { isLoading, error, sendRequest };
};

export default FetchAirtable;
