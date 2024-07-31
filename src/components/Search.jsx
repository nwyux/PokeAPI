"use client";
import { Input } from "./ui/input";

const Search = (props) => {
    return (
        <div className="flex gap-4">
            <Input type="text" placeholder="Rechercher un Pokémon" value={props.search} onChange={props.handleChange} />
        </div>
    );
}

export default Search;