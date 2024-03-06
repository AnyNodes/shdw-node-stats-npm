![CI/CD](https://github.com/AnyNodes/shdw-node-stats-npm/actions/workflows/cicd.yml/badge.svg)

# # shdw-node-stats-npm

This npm package, `shdw-node-stats-npm`, is designed to fetch and record information about blockchain nodes. It retrieves data such as the node's rank, total rewards, and status from a specified API endpoint, then records this information in a CSV file.

## Installation

To install `shdw-node-stats-npm` as a package, simply use pip:

```
npm install shdw-node-stats
```

This command installs `shdw-node-stats-npm` along with all required dependencies. Ensure you have Nodejs installed on your system (version 20 or later is recommended).

## Usage

### As a NPM Package

After installing `shdw-node-stats-npm` via npm, you can use it in your project as follows:

1. Prepare a file named `nodes.txt` or `nodes.json` containing the addresses of the nodes you wish to query.

2. Use the package in your script:

```javascript
const nodestats = require('shdw-node-stats-npm');
```

This will fetch the node information and output it to a CSV file named `node_rankings.csv`.

## File Formats Supported

- **JSON (.json):** Should contain an array of node addresses.
- **Text (.txt):** Should contain node addresses, one per line.

## Output

It generate a CSV file named `node_rankings.csv`, which includes the following columns: Timestamp, Node Address, Rank, Rewards, and Status. The console output will display the node information and the total rewards accumulated by the nodes listed in the input file.

## Community Contribution

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See [LICENSE](./LICENSE) for more information.

## Note

This package/script is intended for educational and demonstration purposes. It showcases how to interact with web APIs, process data in nodejs, and write output to a CSV file. Ensure you have the necessary permissions to use the API and data.
