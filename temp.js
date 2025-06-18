<style>
  body {
    font-family: 'Segoe UI', sans-serif;
    background-color: #f4f7fa;
    margin: 0;
    padding: 2rem;
    color: #333;
  }

  h1 {
    text-align: center;
    color: #1a73e8;
    margin-bottom: 2rem;
    font-size: 1.8rem;
  }

  /* Layout en fila para grupos de select */
  .row {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .form-group {
    flex: 1;
    min-width: 180px;
  }

  label {
    font-weight: 600;
    display: block;
    margin-bottom: 4px;
    font-size: 0.9rem;
  }

  select, input[type="text"] {
    width: 100%;
    padding: 8px 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background: #fff;
    font-size: 0.9rem;
    transition: all 0.2s ease;
  }

  select:focus, input[type="text"]:focus {
    outline: none;
    border-color: #1a73e8;
    box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.2);
  }

  /* Input con botón copy */
  .input-group {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 0.8rem;
    max-width: 600px;
  }

  .input-group input {
    flex: 1;
    min-width: 0;
  }

  .material-symbols-outlined {
    font-size: 20px;
    color: #555;
    padding: 6px;
    border-radius: 50%;
    transition: background 0.2s, color 0.2s;
    cursor: pointer;
  }

  .material-symbols-outlined:hover {
    background-color: #e0e0e0;
    color: #000;
  }

  /* Responsive para móviles */
  @media (max-width: 600px) {
    .row {
      flex-direction: column;
    }

    .input-group {
      flex-direction: column;
      align-items: stretch;
    }

    .input-group input {
      width: 100%;
    }
  }
</style>
