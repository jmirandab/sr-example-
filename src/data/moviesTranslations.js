// Base movie data (language-independent)
const baseMovies = [
    {
        id: 'drama-aqui-y-ahora',
        slug: 'aqui-y-ahora',
        genre: 'Drama',
        image: '/img/aqui_y_ahora.jpg',
        cast: [
            {
                name: 'Paz León',
                role: 'directora',
                profilePicture: "/img/paz_leon.jpeg",
                altText: "La fotografía muestra a una mujer adulta con expresión serena y profesional, mirando directamente a la cámara. Viste una blusa clara sin mangas y accesorios discretos, con el cabello suelto y peinado de forma natural. El fondo neutro y sobrio refuerza una imagen de confianza, liderazgo y rigor artístico, adecuada para presentar a una directora de cine en un contexto profesional y autoral."
            },
            {
                name: 'Nerina Carmona',
                role: 'actriz',
                profilePicture: null
            },
            {
                name: 'Eugenia Chaverri',
                role: 'actriz',
                profilePicture: null
            }
        ]
    },
    {
        id: 'drama-clara-sola',
        slug: 'clara-sola',
        genre: 'Drama',
        image: '/img/clara_sola.jpeg',
        cast: [
            {
                name: 'Nathalie Álvarez',
                role: 'director',
                profilePicture: null
            },
            {
                name: 'Wendy Chinchilla',
                role: 'actor',
                profilePicture: null
            },
            {
                name: 'Daniel Castañeda',
                role: 'actor',
                profilePicture: null
            }
        ]
    },
    {
        id: 'comedia-cascos-indomables',
        slug: 'cascos-indomables',
        genre: 'Comedia',
        image: '/img/cascos_indomables.jpg',
        cast: [
            {
                name: 'Roberto Jiménez',
                role: 'director',
                profilePicture: null
            },
            {
                name: 'Luis Morales',
                role: 'actor',
                profilePicture: null
            },
            {
                name: 'Patricia Vargas',
                role: 'actor',
                profilePicture: null
            }
        ]
    },
    {
        id: 'comedia-por-las-plumas',
        slug: 'por-las-plumas',
        genre: 'Comedia',
        image: '/img/por_las_plumas.jpg',
        cast: [
            {
                name: 'Sofía Herrera',
                role: 'director',
                profilePicture: null
            },
            {
                name: 'Miguel Torres',
                role: 'actor',
                profilePicture: null
            },
            {
                name: 'Carmen Delgado',
                role: 'actor',
                profilePicture: null
            }
        ]
    },
    {
        id: 'ciencia-orbita-prima',
        slug: 'orbita-prima',
        genre: 'Ciencia ficción',
        image: '/img/orbita_prima.jpg',
        cast: [
            {
                name: 'Diego Ramírez',
                role: 'director',
                profilePicture: null
            },
            {
                name: 'Elena Castillo',
                role: 'actor',
                profilePicture: null
            },
            {
                name: 'Andrés Vega',
                role: 'actor',
                profilePicture: null
            }
        ]
    }
];

// Function to get translated movies
export const getTranslatedMovies = (t) => {
    return baseMovies.map(movie => ({
        ...movie,
        title: t(`movies.${movie.slug}.title`),
        description: t(`movies.${movie.slug}.description`),
        genre: t(`genres.${movie.genre}`)
    }));
};

// Function to get movies grouped by genre
export const getTranslatedMoviesByGenre = (t) => {
    const movies = getTranslatedMovies(t);
    return movies.reduce((acc, movie) => {
        if (!acc[movie.genre]) {
            acc[movie.genre] = [];
        }
        acc[movie.genre].push(movie);
        return acc;
    }, {});
};

export default baseMovies;
