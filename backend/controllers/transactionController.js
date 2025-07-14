const pool = require("../db");

// Method: GET
// @route: user/transactions
// description: user transactions
const getUserTransactions = async (req, res) => {
  try {
    // this SQL command lets us to get rows which belong to user id and order the rows based on their created_at
    const result = await pool.query(
      "SELECT * FROM transactions WHERE user_id = $1 ORDER BY created_at DESC",
      [req.user.id]
    );
    res.json(result.rows);
  } catch (error) {
    console.log(error);
  }
};

// Method: POST
// @route: /user/transaction
// description: make a trasnaction
const createTransaction = async (req, res) => {
  const userId = req.user.id;
  const { amount, type } = req.body;

  //checking if the transaction type is correct
  if (!["DEPOSIT", "WITHDRAW"].includes(type)) {
    return res.status(400).json({ message: "Invalid transaction type" });
  }

  const result = await pool.query("SELECT balance FROM users WHERE id=$1", [
    userId,
  ]);

  // converting string to number here with parseFloat
  const currentBalance = parseFloat(result.rows[0].balance);
  if (type === "WITHDRAW" && currentBalance < amount) {
    return res
      .status(400)
      .json({ message: `${currentBalance}$ is not Sufficient` });
  }
  // minimum amount
  if (5 > amount) {
    return res.status(400).json({ message: `Minimum amount is: 5$` });
  }

  try {
    // checking - or +
    const signedAmount = type === "WITHDRAW" ? -amount : amount;
    await pool.query("UPDATE users SET balance = balance + $1 WHERE id = $2", [
      signedAmount,
      userId,
    ]),
      await pool.query(
        "INSERT INTO transactions (user_id, amount, type) VALUES ($1, $2, $3)",
        [userId, amount, type]
      );
    res.status(200).json({ message: `${type} of $${amount} successful.` });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getUserTransactions, createTransaction };
