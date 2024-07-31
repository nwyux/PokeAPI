"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import "../../../app/globals.css"

const PokemonDetail = () => {
    const router = useRouter();
    const { id } = router.query;
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        if (id) {
            axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
                .then(response => {
                    setPokemon(response.data);
                })
                .catch(error => {
                    console.error("Error fetching Pokémon data:", error);
                });
        }
    }, [id]);

    if (!pokemon) return <div>Loading...</div>;

    return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-4 bg-gray-400">
        <h1 className="text-4xl text-black underline">
          <a href="/">Pokedex</a>
          </h1>
            <Card>
                <CardHeader>
                    <CardTitle>{pokemon.name}</CardTitle>
                </CardHeader>
                <CardContent>
                    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                    <p>Height: {pokemon.height}</p>
                    <p>Weight: {pokemon.weight}</p>
                    <p>Base Experience: {pokemon.base_experience}</p>
                    <p>Types: {pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
                </CardContent>
                <CardFooter>
                    <Button onClick={() => router.push('/')}>Retour à l'accueil</Button>
                </CardFooter>
            </Card>
        </main>
    );
};

export default PokemonDetail;
