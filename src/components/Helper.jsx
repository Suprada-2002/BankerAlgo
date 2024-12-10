export const calculateAvailable = (alloc, totalResources, resources) => {
    const totalAllocated = alloc.reduce((sum, processAlloc) => {
        return sum.map((val, index) => val + (processAlloc[index] || 0));
    }, Array(resources).fill(0));

    return totalResources.map((total, index) => total - totalAllocated[index]);
};


export const calculateNeed = (alloc, max, processes, resources, setError) => {
    // return max.map((maxResources, i) =>
    //     maxResources.map((maxVal, j) => maxVal - (alloc[i][j] || 0))
    // );
    const need = max.map((maxResources, i) => {
        return maxResources.map((maxVal, j) => {
            const neededValue = maxVal - (alloc[i][j]);
            // Check for negative values
            if (neededValue < 0) {
                setError(true);
                return 0;
            }
            return neededValue;
        });
    });
    // Clear previous error if there's no current error
    setError(false);
    return need;
};

export const checkSafeState = (alloc, max, processes, available, need, setSafeSequence, setIsDeadlock) => {
    const finish = Array(processes).fill(false);
    const safeSeq = [];
    let work = [...available];

    let canFinish = true;

    while (canFinish) {
        canFinish = false; // Reset for the next iteration
        for (let i = 0; i < processes; i++) {
            // Check if process i has not finished and its need can be met with current work
            if (!finish[i] && need[i].every((n, j) => n <= work[j])) {
                // Process can finish
                safeSeq.push(`P${i}`);
                finish[i] = true;
                work = work.map((w, j) => w + alloc[i][j]); // Update work with allocated resources
                canFinish = true; // Set to true as we found a process that can finish
            }
        }
    }

    // Check if all processes finished
    if (finish.every(f => f === true)) {
        setSafeSequence(safeSeq);
        setIsDeadlock(false);
    } else {
        setIsDeadlock(true);
    }
};
