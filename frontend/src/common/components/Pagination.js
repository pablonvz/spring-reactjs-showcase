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
    const maxSideButtons = 4;
    const totalLeftButtons = Math.min(maxSideButtons + 1, currentPage);
    const leftButtons = Array(totalLeftButtons)
        .fill(currentPage - (maxSideButtons + 1))
        .map((curVal, idx) => {
            const pageNumber = currentPage - totalLeftButtons + idx + 1;
            return (
                <Pagination.Item key={pageNumber}
                    active={pageNumber === currentPage}
                    onClick={goToPage(pageNumber)}>
                        {pageNumber}
                </Pagination.Item>
            );
        }
    );


    const totalRightButtons = Math.min(maxSideButtons, totalPages - currentPage);
    const rightButtons = Array(totalRightButtons)
        .fill(currentPage)
        .map((curVal, idx) => {
            const pageNumber = currentPage + idx + 1;
            return (
                <Pagination.Item
                    key={pageNumber}
                    active={pageNumber === currentPage}
                    onClick={goToPage(pageNumber)}>
                        {pageNumber}
                </Pagination.Item>
            );
        }
    );

    return (
        <Pagination>
            <Pagination.First onClick={goToPage(1)} />
            {leftButtons}
            {rightButtons}
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