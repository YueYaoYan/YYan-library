<template>
  <div class="card">
    <h1>Filters</h1>
    <form @submit.prevent="fetchBooks">
      <div class="row mb-3">
        <div class="col">
          <label class="form-label" for="minIsbn">Minimum ISBN: </label>
          <input
            id="minIsbn"
            type="number"
            class="form-control"
            placeholder="Enter Minimum ISBN"
            v-model="filters.minIsbn"
            min="0"
          />
        </div>
        <div class="col">
          <label class="form-label" for="maxIsbn">Maximum ISBN: </label>
          <input
            id="maxIsbn"
            type="number"
            class="form-control"
            placeholder="Enter Maximum ISBN"
            v-model="filters.maxIsbn"
            min="0"
          />
        </div>
        <div class="col">
          <label class="form-label" for="name">Name: </label>
          <input
            id="name"
            type="text"
            class="form-control"
            placeholder="Book Name"
            v-model="filters.bookName"
          />
        </div>
        <div class="col">
          <label class="form-label" for="order">Order Direction: </label>
          <select
            id="order"
            v-model="filters.orderDirection"
            class="form-control"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        <div class="col">
          <label class="form-label" for="limit">Limit: </label>
          <input
            id="limit"
            type="number"
            class="form-control"
            placeholder="Limit Results"
            v-model="filters.limit"
            min="1"
          />
        </div>
        <div class="col">
          <button type="submit" class="btn btn-primary">Fetch Books</button>
        </div>
      </div>
    </form>
  </div>

  <div
    v-for="book in books"
    :key="book.id"
    class="col-12 col-md-6 col-lg-4 mb-4 mt-3"
  >
    <div class="card mb-3 h-100" style="width: 18rem">
      <div class="row g-0 align-items-center">
        <div class="card-body">
          <h5 class="card-title">{{ book.name }}</h5>
          <p class="card-text">ISBN: {{ book.isbn }}</p>
          <button @click="deleteBook(book.id)" class="btn btn-danger me-2">
            Delete
          </button>
          <button @click="updateBook(book.id)" class="btn btn-warning">
            Update
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import {
  collection,
  where,
  query,
  orderBy,
  limit,
  deleteDoc,
  doc,
  updateDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "@/firebase/init";

export default {
  setup() {
    const books = ref([]);

    const filters = ref({
      minIsbn: "0",
      maxIsbn: "Infinity",
      bookName: "",
      orderDirection: "asc",
      limit: "1",
    });

    const validate = () => {
      const filterMinIsbn = Number(filters.value.minIsbn);
      const filterMaxIsbn =
        filters.value.maxIsbn == "" ? Infinity : Number(filters.value.maxIsbn);
      const filterLimit = Number(filters.value.limit);

      if (filterMinIsbn > filterMaxIsbn) return false;
      if (filterLimit < 1) return false;
      return true;
    };

    const fetchBooks = async () => {
      try {
        if (!validate()) {
          alert("Filter applied is invalid, please check inputs!");
        }
        const filterMinIsbn = Number(filters.value.minIsbn);
        const filterMaxIsbn = Number(filters.value.maxIsbn);
        const filterBookName = filters.value.bookName;
        const filterOrderDirection = filters.value.orderDirection;
        const filterLimit = Number(filters.value.limit);
        let q = query(collection(db, "books"));

        // filters
        q = query(
          q,
          where("isbn", ">=", filterMinIsbn),
          where("isbn", "<=", filterMaxIsbn)
        );

        if (filterBookName != "") {
            q = query(q, where("name", "==", filterBookName));
        }

        // filter order
        q = query(q, orderBy("isbn", filterOrderDirection));

        // filter limit
        q = query(q, limit(filterLimit));
        const querySnapshot = await getDocs(q);
        const booksArray = [];
        querySnapshot.forEach((doc) => {
          booksArray.push({ id: doc.id, ...doc.data() });
        });
        books.value = booksArray;
      } catch (error) {
        console.log("Error fetching book: ", error);
      }
    };

    const deleteBook = async (bookId) => {
      try {
        await deleteDoc(doc(db, "books", bookId));
        alert("Book deleted successfully!");
        fetchBooks(); 
      } catch (error) {
        console.error("Error deleting book: ", error);
      }
    };

    const updateBook = async (bookId) => {
      try {
        const newName = prompt("Enter the new name for the book:");
        if (newName) {
          await updateDoc(doc(db, "books", bookId), { name: newName });
          alert("Book updated successfully!");
          fetchBooks(); 
        }
      } catch (error) {
        console.error("Error updating book: ", error);
      }
    };

    onMounted(() => {
      fetchBooks();
    });

    return { books, deleteBook, updateBook, filters, fetchBooks };
  },
};
</script>
