import React, { useState, useEffect } from 'react';

interface GiphyImageProps {
  name: string;
}

// La API key se lee de una variable de entorno (ver archivo .env.example).
// Si no se define ninguna, se usa la key de demostracion del laboratorio
// original (limitada y de uso educativo).
const GIPHY_API_KEY =
  process.env.REACT_APP_GIPHY_API_KEY || 'VTrxvChXJQ78sDbMD3veV2Z3WtwAT8OJ';

const FALLBACK_GIF = '//media.giphy.com/media/YaOxRsmrv9IeA/giphy.gif';

const GiphyImage: React.FC<GiphyImageProps> = ({ name }) => {
  const [giphyUrl, setGiphyUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const giphyApi = `//api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&limit=1&q=`;

    setIsLoading(true);

    fetch(giphyApi + encodeURIComponent(name))
      .then(response => response.json())
      .then(response => {
        if (response.data && response.data.length > 0) {
          setGiphyUrl(response.data[0].images.original.url);
        } else {
          setGiphyUrl(FALLBACK_GIF);
        }
        setIsLoading(false);
      })
      .catch(() => {
        setGiphyUrl(FALLBACK_GIF);
        setIsLoading(false);
      });
  }, [name]);

  if (isLoading) {
    return <p>Cargando imagen...</p>;
  }

  if (!giphyUrl) {
    return null;
  }

  return <img src={giphyUrl} alt={name} width="200" loading="lazy" />;
};

export default GiphyImage;
