import WATCHLIST_ERRORS from "../errors/watchlist.js";

export async function watchlistErrorHandler(err, res) {
    console.error("Watchlist error:", err.message);

  // ITEM NOT FOUND
    if (err.message === WATCHLIST_ERRORS.WATCHLIST_NOT_FOUND) {
    return res
        .status(404)
        .json({ error: WATCHLIST_ERRORS.WATCHLIST_NOT_FOUND });
    }

    if (err.message === WATCHLIST_ERRORS.ITEM_NOT_IN_WATCHLIST) {
        return res
        .status(404)
        .json({ error: WATCHLIST_ERRORS.ITEM_NOT_IN_WATCHLIST });
    }

  // ITEM DUPLICATE
    if (err.message === WATCHLIST_ERRORS.ITEM_ALREADY_IN_WATCHLIST) {
        return res
        .status(409)
        .json({ error: WATCHLIST_ERRORS.ITEM_ALREADY_IN_WATCHLIST });
    }

  // WATCHLIST EMPTY
    if (err.message === WATCHLIST_ERRORS.WATCHLIST_EMPTY) {
        return res.status(400).json({ error: WATCHLIST_ERRORS.WATCHLIST_EMPTY });
    }

  // DEFAULT
    return res.status(500).json({ error: "WATCHLIST_ERROR" });
}