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
    font-size: 2rem;
  }

  label {
    font-weight: 600;
    display: block;
    margin-bottom: 5px;
    color: #2d2d2d;
  }

  select, input[type="text"] {
    width: 100%;
    padding: 10px 12px;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 10px;
    background: #fff;
    transition: all 0.2s ease;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  }

  select:focus, input[type="text"]:focus {
    outline: none;
    border-color: #1a73e8;
    box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.2);
  }

  div {
    margin-bottom: 1.5rem;
  }

  .input-group {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    gap: 10px;
    margin-bottom: 1rem;
    background: #fff;
    padding: 1rem;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  }

  .material-symbols-outlined {
    font-size: 20px;
    color: #555;
    padding: 6px;
    border-radius: 50%;
    transition: background 0.2s, color 0.2s;
  }

  .material-symbols-outlined:hover {
    background-color: #e0e0e0;
    color: #000;
  }

  @media (max-width: 600px) {
    body {
      padding: 1rem;
    }

    .input-group {
      grid-template-columns: 1fr;
      gap: 5px;
    }

    select, input[type="text"] {
      font-size: 1rem;
    }
  }
</style>
