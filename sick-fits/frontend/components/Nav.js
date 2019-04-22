import React from 'react';
import { Mutation } from 'react-apollo';
import { TOGGLE_CART_MUTATION } from './Cart';

import Link from 'next/link';
import NavStyles from './styles/NavStyles';
import User from './User';
import SignOut from '../components/SignOut';
import CartCount from './CartCount';


const Nav = () => (
    <User>
        {({data: { me }}) => (
            <NavStyles>
                <Link href="/items">
                    <a>
                        Shop
                    </a>
                </Link>
                {me ? (
                    <React.Fragment>
                        <Link href="/sell">
                            <a>
                                Sell
                            </a>
                        </Link>
                        <Link href="/orders">
                            <a>
                                Orders
                            </a>
                        </Link>
                        <Link href="/me">
                            <a>
                                Account
                            </a>
                        </Link>
                        <SignOut />
                        <Mutation
                            mutation={TOGGLE_CART_MUTATION}
                        >
                            {(toggleCart) => (
                                <button onClick={toggleCart}>
                                    My cart
                                    <CartCount
                                        count={
                                            me.cart.reduce((tally, cartItem) => (tally + cartItem.quantity), 0)
                                        } 
                                    />
                                </button>
                            )}
                        </Mutation>
                        
                    </React.Fragment>
                ) : 
                    <Link href="/signup">
                        <a>
                            Sign In
                        </a>
                    </Link>    
                }
            </NavStyles>
        )}
    </User>
);
export default Nav;