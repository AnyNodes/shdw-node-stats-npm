const axios = require('axios');
const fs = require('fs');
const { createObjectCsvWriter } = require('csv-writer');
const { DateTime } = require('luxon');

const get_node_info = async (node_address) => {
    const api_url = "https://shdw-rewards-oracle.shdwdrive.com/node-leaderboard";
    
    try {
        const response = await axios.get(api_url);
        const data = response.data;
        const node_info = data.nodes.find(node => node.node_id === node_address);

        if (node_info) {
            const rank = data.nodes.indexOf(node_info) + 1;
            const rewards = parseInt(node_info.total_rewards) / 1_000_000_000; // Divide by 1 billion
            const status = node_info.status;
            return { rank, rewards, status };
        }
    } catch (error) {
        console.error('Error fetching node info:', error);
    }
    return null;
};

const record_node_data = async (data_filename, node_address, rank, rewards, status) => {
    const csvWriter = createObjectCsvWriter({
        path: data_filename,
        append: true,
        header: [
            {id: 'timestamp', title: 'Timestamp'},
            {id: 'nodeAddress', title: 'Node Address'},
            {id: 'rank', title: 'Rank'},
            {id: 'rewards', title: 'Rewards'},
            {id: 'status', title: 'Status'},
        ]
    });

    await csvWriter.writeRecords([{ timestamp: DateTime.now().toString(), nodeAddress: node_address, rank, rewards, status }]);
};

(async () => {
    const filename = "nodes.txt"; // or "nodes.json"
    const data_filename = "node_rankings.csv";
    let nodes = [];

    try {
        if (filename.endsWith('.json')) {
            const data = fs.readFileSync(filename, 'utf8');
            nodes = JSON.parse(data);
        } else if (filename.endsWith('.txt')) {
            const data = fs.readFileSync(filename, 'utf8');
            nodes = data.split(/\r?\n/);
        } else {
            console.log("Unsupported file format. Please use a .json or .txt file.");
            process.exit(1);
        }
    } catch (error) {
        console.error('Error reading node addresses:', error);
        process.exit(1);
    }

    console.log("====================================");
    console.log(`Current Timestamp: ${DateTime.now().toString()}`);
    console.log("------");
    console.log(`${"Node Address".padEnd(50)}${"Rank".padEnd(8)}${"Rewards".padEnd(20)}Status`);

    let total_rewards = 0;

    for (const node_address of nodes) {
        const result = await get_node_info(node_address);
        if (result) {
            const { rank, rewards, status } = result;
            total_rewards += rewards;
            console.log(`${node_address.padEnd(50)}${rank.toString().padEnd(8)}${rewards.toString().padEnd(20)}${status}`);
            await record_node_data(data_filename, node_address, rank, rewards, status);
        } else {
            console.log(`${node_address.padEnd(50)}${"Not found".padEnd(8)}${"Not found".padEnd(20)}Not found`);
        }
    }

    console.log("------");
    console.log(`${"Total Rewards: ".padEnd(58)}${total_rewards.toString().padEnd(20)}`);
    console.log("====================================");
})();
