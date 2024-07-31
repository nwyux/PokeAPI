"use client";
import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
  PaginationPrevious,
  PaginationNext
} from './ui/pagination';

const Pages = ({ itemsPerPage, totalItems, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const createPageLinks = () => {
        let pageLinks = [];

        pageLinks.push(
            <PaginationItem key="prev">
                <PaginationPrevious 
                    href="#" 
                    onClick={(e) => {
                        e.preventDefault();
                        if (currentPage > 1) onPageChange(currentPage - 1);
                    }}
                />
            </PaginationItem>
        );

        for (let i = 1; i <= totalPages; i++) {
            if (i === currentPage) {
                pageLinks.push(
                    <PaginationItem key={i}>
                        <PaginationLink href="#" className="bg-slate-800 text-white">
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                );
            } else {
                pageLinks.push(
                    <PaginationItem key={i}>
                        <PaginationLink 
                            href="#" 
                            onClick={(e) => {
                                e.preventDefault();
                                onPageChange(i);
                            }}
                        >
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                );
            }
        }

        if (totalPages > 5) {
            pageLinks.push(
                <PaginationItem key="ellipsis">
                    <PaginationEllipsis />
                </PaginationItem>
            );
        }

        pageLinks.push(
            <PaginationItem key="next">
                <PaginationNext 
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        if (currentPage < totalPages) onPageChange(currentPage + 1);
                    }}
                />
            </PaginationItem>
        );

        return pageLinks;
    };

    return (
        <Pagination>
            <PaginationContent>
                {createPageLinks()}
            </PaginationContent>
        </Pagination>
    );
};

export default Pages;
