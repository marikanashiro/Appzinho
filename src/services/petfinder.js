import axios from 'axios';

const fetchAnimals = async (page = 1) => {
  try {
    const tokenResponse = await axios.post('https://api.petfinder.com/v2/oauth2/token', {
      grant_type: 'client_credentials',
      client_id: 'ePVez3CpBfcmo2lS54LE0WynpKkkx7Xxx6BdDIGGRsxBQK6fta',
      client_secret: 'tMx14nYyJ6T0Satu7d0i23cxAaQptW4SN4EnGgIq',
    });
    const accessToken = tokenResponse.data.access_token;

    const animalsResponse = await axios.get('https://api.petfinder.com/v2/animals', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        limit: 5,
        page,
      },
    });
    return animalsResponse.data.animals || [];
  } catch (error) {
    console.error('Erro ao buscar animais:', error);
    return [];
  }
};

export { fetchAnimals };