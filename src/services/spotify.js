const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

let accessToken = '';
let tokenExpirationTime = 0;

/** Obtiene/reutiliza el access token de Spotify (Client Credentials) */
export async function getAccessToken() {
  if (accessToken && Date.now() < tokenExpirationTime) {
    return accessToken;
  }

  const credentials = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${credentials}`
    },
    body: 'grant_type=client_credentials'
  });

  if (!response.ok) {
    throw new Error(`Error al obtener el token de Spotify (${response.status})`);
  }

  const data = await response.json();
  accessToken = data.access_token;
  tokenExpirationTime = Date.now() + (data.expires_in - 60) * 1000;

  return accessToken;
}

/** Información básica del artista */
export async function getArtist(artistId) {
  const token = await getAccessToken();
  const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!response.ok) throw new Error(`Artista: error ${response.status}`);
  return await response.json();
}

// IDs de canciones copiados desde Spotify
export const fallbackTracks = {
  '26dSoYclwsYLMAKD3tpOr4': [ // Britney Spears
    { id: '6ic8OlLUNEATToEFU3xmaH' }, // Gimme more
    { id: '3MjUtNVVq3C8Fn0MP3zhXa' }, // Baby one more time
    { id: '6I9VzXrHxO9rA9A5euc8Ak' }, // Toxic
    { id: '6naxalmIoLFWR0siv8dnQQ' }, // Oops! I did it again
    { id: '4fixebDZAVToLbUCuEloa2' }, // Womanizer
    { id: '7jk7gqyEonmVVYahZN5zhW' }, // Circus
    { id: '0dRhSF9LV0HR8Jwd3MMMKJ' }, // Everytime
    { id: '2EvwLVrnYbCZEG6Kx5DCRy' }, // Piece of me
    { id: '5ZlhzdxbUTVs70gBpHTu29' }, // I wanna go
    { id: '1dwXWQRPamEngGsLjbNWNi' }, // Criminal
    { id: '4jCZebg0Wbgtntd8hpy8Dg' }  // Till the world ends
  ],
  '1l7ZsJRRS8wlW3WfJfPfNS': [ // Christina Aguilera
    { id: '11mwFrKvLXCbcVGNxffGyP' }, // Genie in a bottle
    { id: '4B1sb2YVO03sBmyR8bvzEB' }, // Pero me acuerdo de ti
    { id: '5lUTzPuiloBHm1qEaJcJfF' }, // Candyman
    { id: '2PYJnUWEPPP8C6b79UiwIl' }, // Ven conmigo
    { id: '0Mrq76p3dcIF8vrzWQyMVG' }, // Falsas esperanzas
    { id: '0Hf4aIJpsN4Os2f0y0VqWl' }, // Feel this moment
    { id: '7pYfyrMNPn3wtoCyqcTVoI' }, // Moves like Jagger
    { id: '6Vc5wAMmXdKIAM7WUoEb7N' }, // Say something
    { id: '5bGmuxShUba9maPswDnhCs' }, // What a girl wants
    { id: '7nXq1vaZiz7PdbfojpPjW5' }, // Fighter
    { id: '6fq4QyaUskNqES6lJqgYjW' }  // How yoy burlesque
  ],'6vWDO969PvNqNYHIOW5v0m': [ // Beyoncé
    { id: '2MfOcbtgz2yTsiznFmVZUN' }, // Halo
    { id: '1G7DcLzPnopdZjLkev0K4e' }, // Irreplaceable
    { id: '0TwBtDAWpkpM3srywFVOV5' }, // Crazy in love
    { id: '76Y07hjDi7fjJnZKsQbEaF' }, // Beautiful liar
    { id: '0K7wIocSvzcRISpssBUzfZ' }, // If i were a boy
    { id: '6Q8ljVgg7kR0R5v2aOXHlg' }, // Sweet dreams
    { id: '6jG2YzhxptolDzLHTGLt7S' }, //Drunk in love
    { id: '0CPLnPUUHh44vAzDSM5ZlR' }, // Naughty girl
    { id: '058BagJYG30lHu8qrwRlo7' }, // Morning dew
    { id: '7nXq1vaZiz7PdbfojpPjW5' }, // Fighter
    { id: '5mMjkxGijQB4JZallYrkOW' }  // Single ladies 
  ],'5pKCCKE2ajJHZ9KAiaK11H': [ // Rihanna
    { id: '0ByMNEPAPpOR5H69DVrTNy' }, // Don’t stop the music
    { id: '2ENexcMEMsYk0rVJigVD3i' }, // Only girl (in the world)
    { id: '6qn9YLKt13AGvpq9jfO8py' }, // We found love
    { id: '49FYlytm3dAAraYgpoJZux' }, // Umbrella
    { id: '7ySUcLPVX7KudhnmNcgY2D' }, // S&M
    { id: '0UHB9METy4VCXNgkcGqHqS' }, // Kiss it better
    { id: '5oO3drDxtziYU2H1X23ZIp' }, //Love on the brain
    { id: '46aZJc0z1HHHSFxaIRxYSP' }, // Breakin dishes
    { id: '5WQQIDU3HRaMyPkob8mpFb' }, // Where have you been
    { id: '15JINEqzVMv3SvJTAXAKED' }, // love the way you lie
    { id: '0NTMtAO2BV4tnGvw9EgBVq' }  // Bitch better have my money
  ],'1HY2Jd0NmPuamShAr6KMms': [ // Lady gaga
    { id: '7so0lgd0zP2Sbgs2d7a1SZ' }, // Die with a smile
    { id: '1QV6tiMFM6fSOKOGLMHYYg' }, // Poker face
    { id: '02XnQdf7sipaKBBHixz3Zp' }, // Papparazzi
    { id: '1dzQoRqT5ucxXVaAhTcT0J' }, // Just dance
    { id: '0SiywuOBRcynK0uKGWdCnn' }, // Bad romance
    { id: '7F25roCtYi55JouckaayPC' }, // Judas
    { id: '2rbDhOo9Fh61Bbu23T2qCk' }, //Always remember us this way
    { id: '2VxeLyX666F8uXCJ0dZF8B' }, // Shallow
    { id: '4TCL0qqKyqsMZml0G3M9IM' }, // Telephone
    { id: '2LHNTC9QZxsL3nWpt8iaSR' }, // Abracadabra
    { id: '0TcJ7QWpggdSg8t0fHThHm' }  // Love game
  ],
  '6M2wZ9GZgrQXHCFfjv46we': [ // Dua Lipa
    { id: '5b5cPscqVEMChvDqscVw26' },
    { id: '5nujrmhLynf4yMoMtj8AQF' },
    { id: '3PfIrDoz19wz7qK7tYeu62' },
    { id: '7ef4DlsgrMEH11cDZd32M6' },
    { id: '6zSpb8dQRaw0M1dK8PBwQz' },
    { id: '2ekn2ttSfGqwhhate0LSR0' },
    { id: '3AzjcOeAmA57TIOr9zF1ZW' },
    { id: '6D8y7Bck8h11byRY88Pt2z' },
    { id: '11C4y2Yz1XbHmaQwO06s9f' },
    { id: '6acdKgBrJoYKbJD6WhG81R' }
  ],
  '06HL4z0CvFAxyc27GXpf02': [ // Taylor Swift
  { id: '11hcBLPtbMp4aQI6zGQLub'},//Patient Zero
  { id: '1u8c2t2Cy7UBoG4ArRcF5g'},//Blank space
  { id: '3yWuTOYDztXjZxdE2cIRUa'},//Opalite
  { id: '2j7wI9QWrP8cjKDdOLVQTU'},//Babylon
  { id: '3gyJbNBTRVRdZDA1yO3clm'},//Pink clouding
  { id: '7uxkx8HPBYkJKcimOyggUM'},//Cleveland
  { id: '1BxfuPKGuaTgP7aM0Bbdwr'},//Cruel summer
  { id: '5uPaqMMt59KGrdKIitDRqa'},//I knew it 
  { id: '0ug5NqcwcFR2xrfTkc7k8e'},//Style
  { id: '53iuhJlwXhSER5J2IYYv1W'}//The fate of ophelia
  
  ],
  '66CXWjxzNUsdJxJ2JdwvnR': [// Ariana Grande
    { id: '76FZM38RC8XaAjJ77CVTNe'}, //Into you
    { id: '51ZQ1vr10ffzbwIjDCwqm4'}, //We can't be a friends
    { id: '3iy2QuCtCzpWnR6tia39AB'}, //Hate that i made you love me
    { id: '70pVCVMGjmIWPbWXDwf11e'}, //Petal
    { id: '5J4ZkQpzMUFojo1CtAZYpn'}, //Love me harder
    { id: '1oFAF1hdPOickyHgbuRjyX'}, //Save your tears
    { id: '7xoUc6faLbCqZO6fQEYprd'}, //One last time
    { id: '6ocbgoVGwYJhOv1GgI9NsF'}, //7 rings
    { id: '44ONERBHALxftQNWq6dmyd'}, //Side to side
    { id: '3nef5W8jTkXrOKgCu4kmq7'} //Dangerous woman
  
  ],
  
  '5cj0lLjcoR7YOSnhnX0Po5': [//Doja Cat
    { id: '6Uj1ctrBOjOas8xZXGqKk4'}, //Woman
    { id: '3DarAbFujv6eYNliUTyqtz'}, //Kiss me more
    { id: '60ynsPSSKe6O3sfwRnIBRf'}, //Streets
    { id: '5PyDJG7SQRgWXefgexqIge'}, //Agora Hills
    { id: '56y1jOTK0XSvJzVv9vHQBK'}, //Pain the town red
    { id: '3Dv1eDb0MEgF93GpLXlucZ'}, //Say so
    { id: '1VJwtWR6z7SpZRwipI12be'}, //Candy
    { id: '0k4d5YPDr1r7FX77VdqWez'}, //You right
    { id: '3aA6xB0tOilDDX17fIJ0Bl'}, //Freak
    { id: '3Vi5XqYrmQgOYBajMWSvCi'} //Need to know
    ],
    
    '5YGY8feqx7naU7z4HrwZM6': [//Miley Cyrus
    { id: '7DSAEUvxU8FajXtRloy8M0'}, //Flowers
    { id: '3E7dfMvvCLUddWissuqMwr'}, //Party in the U.S.A
    { id: '2vwlzO0Qp8kfEtzTsCXfyE'}, //Wrecking ball
    { id: '2y4lAQpi5VTNLu2ldeTdUH'}, //We can't stop
    { id: '3LzQnKyOaYOfmroOwIvKUS'}, //Bass persuades
    { id: '02dRkCEc8Q5ch4TTcnLxOn'}, //Nothing breaks like a heart
    { id: '1daDRI9ahBonbWD8YcxOIB'}, //Angels like you
    { id: '5AnCLGg35ziFOloEnXK4uu'}, //Adore you
    { id: '5x5JM1BSB6vollcIzDocqT'}, //The climb
    { id: '3Ln4JSpTO4Zc7oRinGsp4k'} //Let's get married
    ],
};

/** Completa cada canción con nombre y álbum (incluye release_date) */
async function enrichTracks(list) {
  const token = await getAccessToken();
  return Promise.all(
    list.map(async (t) => {
      try {
        const res = await fetch(`https://api.spotify.com/v1/tracks/${t.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) {
          console.warn('tracks/', t.id, 'falló con estado', res.status);
          return t;
        }
        const data = await res.json();
        return { ...t, name: data.name, album: data.album };
      } catch {
        return t;
      }
    })
  );
}

/** Top tracks de la API; si falla, usa el respaldo */
export async function getArtistTrackList(artistId, market = 'CL') {
  try {
    const token = await getAccessToken();
    const response = await fetch(
      `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=${market}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (response.ok) {
      const data = await response.json();
      if (data.tracks?.length) return data.tracks;
    } else {
      console.warn('top-tracks falló con estado', response.status);
    }
  } catch (err) {
    console.warn('Error consultando top-tracks:', err);
  }

  const fallback = (fallbackTracks[artistId] || []).filter(t => t.id);
  try {
    return await enrichTracks(fallback);
  } catch {
    return fallback;
  }
}

export function getReleaseDate(track) {
  const raw = track.album?.release_date ?? track.releaseDate;
  if (!raw) return null;
  const [year, month = '01', day = '01'] = raw.split('-');
  return new Date(`${year}-${month}-${day}T00:00:00`);
}

export function sortTracksByReleaseDate(tracks, order = 'desc') {
  const dir = order === 'asc' ? 1 : -1;
  return [...tracks].sort((a, b) => {
    const dateA = getReleaseDate(a);
    const dateB = getReleaseDate(b);
    if (!dateA && !dateB) return 0;
    if (!dateA) return 1;
    if (!dateB) return -1;
    return (dateA - dateB) * dir;
  });
}