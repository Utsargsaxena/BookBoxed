import React, { useState, useEffect } from 'react';
import svg from '../../assets/images/books.svg';
import api from '../../services/api';
import { Toast } from '../../services/sweetAlert';
import { InputSection, SubmitButton, BooksSection, ClearButton, QueryInput } from './styles';
import BookBlock from '../../components/BookBlock';
import styled from 'styled-components'



const Centext = styled.div`
 justify-content:"center";
  align-Items: "center";
`
const Text4 = styled.div`
font-size:20px;
font-weight:bold;
flex:center;

  `

const Button = styled.button`
  background: ${props => props.primary ? "Black" : "white"};
  color: ${props => props.primary ? "white" : "Black"};

  font-size: 1em;
  margin: 10em 10em 10em 10em;
  padding: 0.25em 10em 1em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  display: "flex";
  justify-content:"center";
  align-Items: "center";
`;

const Button1 = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${props => props.primary ? "Black" : "white"};
  color: ${props => props.primary ? "white" : "Black"};

  font-size: 1em;
  margin: 10em 10em 10em 10em;
  padding: 0.25em 10em 1em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  align-items:center;
  justify-content: center;
`;

const FlexA = styled.div`
  display: flex;
  justify-content: space-around;
  @media (max-width: 400px) {
  .flex-container {
    flex-direction: column;
  }
}
`

const FlexB = styled.div`
  display: flex;
  justify-content: space-around;
}
`

const Spaces = styled.div`
margin-top: 100px;
`
const Div1 = styled.div`
display: flex;
justify-content:flex-start;
@media (max-width: 400px) {
  .flex-container {
    flex-direction: column;
  }
}
}`

const Div2 = styled.div`
display: flex;
justify-content:flex-start;
@media (max-width: 400px) {
  .flex-container {
    flex-direction: column;
  }
}
}`

const Div3 = styled.div`
display: flex;
justify-content:flex-start;
}
`
const Text1 = styled.div`
font-size:20px;
justify-content:"center";
  align-Items: "center";
  
  `

function Main() {
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const booksFromStorage = localStorage.getItem('books');
    const queryFromStorage = localStorage.getItem('query');
    if (booksFromStorage && queryFromStorage) {
      setBooks(JSON.parse(booksFromStorage));
      setQuery(queryFromStorage);
    }
  }, []);

  async function fetchBooks() {
    setLoading(true);
    await api.get(`/volumes?q=${query}`).then((response) => {
      if (!response.data.totalItems) {
        setLoading(false);
        return Toast.fire({
          icon: 'error',
          title: 'No books found with this query',
        });
      }

      const books = response.data.items.map((book) => {
        const thumbnailUrl = book.volumeInfo.imageLinks
          ? book.volumeInfo.imageLinks.thumbnail
          : 'https://books.google.com.br/googlebooks/images/no_cover_thumb.gif';

        return {
          id: book.id,
          title: book.volumeInfo.title,
          authors: book.volumeInfo.authors,
          description: book.volumeInfo.description,
          thumbnailUrl,
        };
      });

      setBooks(books);
      setLoading(false);
      localStorage.setItem('books', JSON.stringify(books));
      localStorage.setItem('query', query);
    });
  }

  function handleInput(event) {
    setQuery(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!query) {
      setError('You must type something!');
      setTimeout(() => {
        setError('');
      }, 3000);
      return;
    }

    await fetchBooks();
  }

  function handleClear(event) {
    event.preventDefault();

    setQuery('');
    setBooks([]);
    localStorage.removeItem('query');
    localStorage.removeItem('books');
  }

  return (
    <>
      <InputSection>
        <div className="container">
          <div className="logo">
            <h1>
              <span className="logo-blue">Book</span>Boxed
            </h1>

            <h2>
              The <span className="logo-blue">right place</span> for the ones who love books... 
            </h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="label">
              <label htmlFor="book">Type an author or book name...</label>
            </div>

            <div className="input">
              <QueryInput
                onChange={handleInput}
                value={query}
                autoComplete="off"
                type="text"
                id="book"
                placeholder="Author or book name"
                width70={query && books.length}
              />

              {query && (
                <ClearButton type="button" onClick={handleClear}>
                  <i className="fas fa-times"></i>
                </ClearButton>
              )}

              <SubmitButton loading={loading ? 'loading' : undefined} type="submit">
                {loading ? <i className="fas fa-spinner"></i> : <i className="fas fa-search"></i>}
              </SubmitButton>
            </div>

            {error && (
              <div className="error">
                <span>{error}</span>
              </div>
            )}
          </form>
        </div>
      </InputSection>

      <BooksSection>
        <div className="container">
          {!books.length ? (
            <div className="no-books">
              <img src={svg} alt="No books" />
              <h1>No books yet, you need to search for some book</h1>
            </div>
          ) : (
            books.map((book, index) => <BookBlock book={book} key={index} />)
          )}
        </div>
      </BooksSection>
      

<Spaces/>
<FlexA><Text1>Click Below for Community Chatting</Text1>
<Text1>Books Gallery Available </Text1><Text1>Search for Bookstores below...</Text1>
</FlexA>

<FlexB> 
    <Div1>
<img src="https://cdn.iconscout.com/icon/premium/png-256-thumb/group-chat-2154388-1809306.png" onClick={(e) => {
      e.preventDefault();
      window.location.href='https://schmooze-230cf.web.app/';
      }}></img>
    </Div1>
    <Div2><br/><br/><img src="https://is3-ssl.mzstatic.com/image/thumb/Purple124/v4/df/14/5b/df145b78-21fb-7609-41c5-8bc3c32dc106/source/256x256bb.jpg" onClick={(e) => {
      e.preventDefault();
      window.location.href='https://utsargsaxena.github.io/Gallery/';
      }}></img>
      </Div2>
    <Div3><br/><br/><img src="https://image.shutterstock.com/image-vector/pin-point-logo-can-be-260nw-1679653036.jpg" onClick={(e) => {
      e.preventDefault();
      window.location.href='https://schmooze-230cf.web.app/';
      }}></img></Div3>
</FlexB> 

<br/>

    </>
  );
}

export default Main;
