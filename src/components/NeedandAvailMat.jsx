
function NeedandAvailMat({ need, alloc }) {

    return(
<>
        {
                need && need[0] &&
                <div>
                    <p>Need Matrix</p>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">process no</th>
                                {need && need[0] && need[0].map((_, i) => (
                                    <th key={i} scope="col">Instance {i}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {need && need.map((row, i) => (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    {row.map((cell, j) => (
                                        <td key={j}>{cell} </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }

            {alloc && alloc[0] &&
                <div>
                    <p>Availble Matrix</p>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">process no</th>
                                {alloc && alloc[0] && alloc[0].map((_, i) => (
                                    <th key={i} scope="col">Instance {i}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {alloc && alloc.map((row, i) => (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    {row.map((cell, j) => (
                                        <td key={j}>{cell} </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            }

</>

    )

}

export default NeedandAvailMat;
