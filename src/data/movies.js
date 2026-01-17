export const movies = [
    {
        id: 'drama-aqui-y-ahora',
        title: 'Aquí y ahora',
        genre: 'Drama',
        image: '/img/aqui_y_ahora.jpg',
        description: 'Una emotiva historia sobre la importancia de vivir el presente y valorar cada momento con nuestros seres queridos. Una reflexión profunda sobre la vida, la familia y el tiempo.',
        cast: [
            {
                name: 'Paz León',
                role: 'Directora',
                profilePicture: "/img/paz_leon.jpeg",
                altText: "La fotografía muestra a una mujer adulta con expresión serena y profesional, mirando directamente a la cámara. Viste una blusa clara sin mangas y accesorios discretos, con el cabello suelto y peinado de forma natural. El fondo neutro y sobrio refuerza una imagen de confianza, liderazgo y rigor artístico, adecuada para presentar a una directora de cine en un contexto profesional y autoral."
            },
            {
                name: 'Nerina Carmona',
                role: 'Actriz',
                profilePicture: null
            },
            {
                name: 'Eugenia Chaverri',
                role: 'Actriz',
                profilePicture: null
            }
        ]
    },
    {
        id: 'drama-clara-sola',
        title: 'Clara Sola',
        genre: 'Drama',
        image: '/img/clara_sola.jpeg',
        description: 'Se cree que CLARA, de 40 años, tiene una conexión especial con Dios. Como "sanadora", sostiene a una familia y un pueblo necesitados de esperanza, mientras encuentra consuelo en su relación con la naturaleza. Después de años de ser controlada por el cuidado represivo de su madre, los deseos sexuales de Clara se ven avivados por su atracción hacia el nuevo novio de su sobrina. Esta nueva fuerza lleva a Clara a un territorio inexplorado, lo que le permite cruzar fronteras, tanto físicas como místicas. Fortalecida por su auto descubrimiento, Clara se libera gradualmente de su papel de “santa” y comienza a curarse a sí misma.',
        cast: [
            {
                name: 'Nathalie Álvarez',
                role: 'Director',
                profilePicture: null
            },
            {
                name: 'Wendy Chinchilla',
                role: 'Actriz',
                profilePicture: null
            },
            {
                name: 'Daniel Castañeda',
                role: 'Actor',
                profilePicture: null
            }
        ]
    },
    {
        id: 'comedia-cascos-indomables',
        title: 'Cascos Indomables',
        genre: 'Comedia',
        image: '/img/cascos_indomables.jpg',
        description: 'Una divertida comedia sobre un grupo de motociclistas que deben enfrentar desafíos inesperados en su aventura por las carreteras. Risas garantizadas en cada kilómetro.',
        cast: [
            {
                name: 'Ernesto Villalobos',
                role: 'Director',
                profilePicture: null
            },
            {
                name: 'Arturo Pardo',
                role: 'Actor',
                profilePicture: null
            },
            {
                name: 'Daniela Mora',
                role: 'Actriz',
                profilePicture: null
            }
        ]
    },
    {
        id: 'comedia-por-las-plumas',
        title: 'Por las plumas',
        genre: 'Comedia',
        image: '/img/por_las_plumas.jpg',
        description: 'Una comedia ligera y familiar sobre las aventuras de un grupo de amigos que deciden abrir una granja avícola. Momentos divertidos y situaciones inesperadas los esperan.',
        cast: [
            {
                name: 'Ernesto Villalobos',
                role: 'Director',
                profilePicture: null
            },
            {
                name: 'Marvin Acosta',
                role: 'Actor',
                profilePicture: null
            },
            {
                name: 'Allan Cascante',
                role: 'Actor',
                profilePicture: null
            }
        ]
    },
    {
        id: 'ciencia-orbita-prima',
        title: 'Órbita Prima',
        genre: 'Ciencia ficción',
        image: '/img/orbita_prima.jpg',
        description: 'Una épica aventura espacial que nos lleva a explorar nuevos mundos y civilizaciones. Una historia de supervivencia, descubrimiento y la búsqueda de un nuevo hogar para la humanidad.',
        cast: [
            {
                name: 'Gustavo Cosenza',
                role: 'Director',
                profilePicture: null
            },
            {
                name: 'Melvin Jiménez',
                role: 'Actor',
                profilePicture: null
            },
            {
                name: 'Carlos Miranda',
                profilePicture: "/img/paz_leon.jpeg",
                altText: "La fotografía muestra a una mujer adulta con expresión serena y profesional, mirando directamente a la cámara. Viste una blusa clara sin mangas y accesorios discretos, con el cabello suelto y peinado de forma natural. El fondo neutro y sobrio refuerza una imagen de confianza, liderazgo y rigor artístico, adecuada para presentar a una directora de cine en un contexto profesional y autoral.",
                role: 'Actor',
            }
        ]
    }
];

// Group movies by genre for TreeView
export const peliculas = movies.reduce((acc, movie) => {
    if (!acc[movie.genre]) {
        acc[movie.genre] = [];
    }
    acc[movie.genre].push(movie);
    return acc;
}, {});

export default movies;