"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import Link from 'next/link';
import Search from './Search';
import Pages from './Pagination';

const GetPoke = () => {
    const [pokemonData, setPokemonData] = useState([]);
    const [filteredPokemonData, setFilteredPokemonData] = useState([]);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState('asc');
    const itemsPerPage = 9;

    useEffect(() => {
        axios.get('https://pokeapi.co/api/v2/pokemon?limit=100')
        .then((response) => {
            setPokemonData(response.data.results);
            setFilteredPokemonData(response.data.results);
        });
    }, []);

    const handleChange = (e) => {
        const searchValue = e.target.value.toLowerCase();
        setSearch(searchValue);
        const filteredData = pokemonData.filter(pokemon => pokemon.name.toLowerCase().includes(searchValue));
        setFilteredPokemonData(filteredData);
    };

    const handleSortChange = () => {
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newSortOrder);
        sortData(newSortOrder);
    };

    const sortData = (order) => {
        const sortedData = [...filteredPokemonData].sort((a, b) => {
            if (order === 'asc') {
                return a.name.localeCompare(b.name);
            } else {
                return b.name.localeCompare(a.name);
            }
        });
        setFilteredPokemonData(sortedData);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredPokemonData.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="flex flex-col gap-4">
            <Search search={search} handleChange={handleChange} />
            <div className="flex gap-4 mb-4">
                <Button onClick={handleSortChange}>
                    {sortOrder === 'asc' ? 'Trier par ordre Z-A' : 'Trier par ordre A-Z'}
                </Button>
            </div>
            <div className="grid grid-cols-3 gap-4">
                {currentItems.map((pokemon, index) => {
                    const pokemonIndex = pokemonData.findIndex(p => p.name === pokemon.name) + 1;
                    return (
                        <Card key={pokemonIndex}>
                            <CardHeader>
                                <CardTitle>{pokemon.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex}.png`} alt={pokemon.name} />
                            </CardContent>
                            <CardFooter>
                                <Link href={`/pokemon/${pokemonIndex}`}>
                                    <Button>Voir plus</Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>
            <Pages 
                itemsPerPage={itemsPerPage} 
                totalItems={filteredPokemonData.length} 
                currentPage={currentPage} 
                onPageChange={handlePageChange} 
            />
        </div>
    );
};

export default GetPoke;
