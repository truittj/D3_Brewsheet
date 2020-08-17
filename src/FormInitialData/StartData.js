import React from 'react';
import "./StyleSheet.css";

export default function StartData({ handleAdd }) {
    return (
        <div className="container"> 
                <label> Brand:
                    <input type="text" name="brand" />
                </label>
                <br />
                <label> Batch Number:
                    <input type="number" name="batchNum" placeholder="00000" />
                </label>
                <br />
                <label>
                    Date:
                    <input type="date" id="start" name="mash-in-date" min="2018-01-01" max="2021-12-31" />
                </label>
                <br />
                <button type="submit" onSubmit={handleAdd}>Add</button>
        </div>
    )
}
