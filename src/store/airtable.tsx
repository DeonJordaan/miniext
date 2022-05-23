const Airtable = require('airtable');

const dBase = new Airtable({
	apiKey: process.env.REACT_APP_AIRTABLE_API_KEY,
}).base(process.env.REACT_APP_AIRTABLE_BASE_ID);

export default dBase;
