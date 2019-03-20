import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';

import { perPage } from '../config';
import Item from './Item'; 
import Pagination from './Pagination';

const ALL_ITEMS_QUERY = gql`
    query ALL_ITEMS_QUERY(
        $skip: Int = 0,
        $first: Int = ${perPage}
    ) {
        items(
            first: $first, 
            skip: $skip, 
            orderBy: createdAt_DESC
        ) {
            id,
            title,
            price,
            description,
            image,
            largeImage
        }
    }
`;

const Center = styled.div`
    text-align: center;
`;

const ItemList = styled.div`
    display: grid;
    grid-gap: 60px;
    grid-template-columns: 1fr;
    max-width: ${props => props.theme.maxWidth};
    margin: 0 auto;
    @media (min-width: ${props => props.theme.bpM}) {
        grid-template-columns: 1fr 1fr;
    }
`;

class Items extends Component {
    render() {
        return (
            <Center>
                <Pagination page={this.props.page} />
                <Query
                    query={ALL_ITEMS_QUERY}
                    // fetchPolicy="network-only"
                    variables={{
                        skip: this.props.page * perPage - perPage,
                        first: perPage
                    }}
                >
                    {({ data, error, loading }) => {
                        if (loading) return <p>Loading...</p>
                        if (error) return <p>Error: {error.message}</p>
                        return (
                            <ItemList>
                                {data.items.map(item => <Item key={item.id} item={item} />)}
                            </ItemList>
                        )
                    }}
                </Query>
                <Pagination />
            </Center>
        );
    }
}

export default Items;
export { ALL_ITEMS_QUERY };
