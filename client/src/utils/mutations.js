import { gql } from '@apollo/client'

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!, $address: String!, $firstname: String!, $lastname: String!) {
    addUser(username: $username, email: $email, password: $password, address: $address, firstname: $firstname, lastname: $lastname) {
        token
        user {
            _id
            username
            email
            address
            firstname
            lastname
        }
    }
}
`;
export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
            _id
            username
            email
            address
            products {
                _id
                name
            }
        }
    }
}
`;

export const ADD_PRODUCT = gql`
mutation addProduct($name: String!, $description: String!, $price: Float!, $image: String) {
    addProduct(name: $name, description: $description, price: $price, image: $image) {
        _id
        name
        description
        price
        image
        addedBy
    }
}
`;

export const REMOVE_PRODUCT = gql`
mutation removeProduct($productId: ID!) {
    removeProduct(productId: $productId) {
        _id
        name
    }
}
`

export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      purchaseDate
      products {
        _id
        name
        description
        price
      }
    }
  }
`;