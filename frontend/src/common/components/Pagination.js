import React from 'react';
import { Pagination } from 'react-bootstrap';

const PaginationBar = ({
    currentPage,
    totalPages,
    onPageChange
}) => {
    const goToPage = n => {
        return event => {
            event.preventDefault();

            if (n === currentPage)
                return;

            onPageChange(n);
        };
    };

    const totalButtons = Math.min(11, totalPages);
    const middleButtonNumber = Math.max(1, currentPage - (totalButtons / 2).toFixed());
    const firstButtonNumber = Math.max(1, Math.min(middleButtonNumber, totalPages - totalButtons));
    const pageButtons = Array(totalButtons)
        .fill()
        .map((_, idx) => {
            const pageNumber = firstButtonNumber + idx;
            return (
                <Pagination.Item key={pageNumber}
                    active={pageNumber === currentPage}
                    onClick={goToPage(pageNumber)}>
                        {pageNumber}
                </Pagination.Item>
            );
        });

    return (
        <Pagination>
            <Pagination.First onClick={goToPage(1)} />
            {pageButtons}
            <Pagination.Last onClick={goToPage(totalPages)} />
        </Pagination>
    );
};

PaginationBar.defaultProps = {
    onPageChange: pageNumber => {
        console.log("go to page " + pageNumber);
    }
}

export default PaginationBar;