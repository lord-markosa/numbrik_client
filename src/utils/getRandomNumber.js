export default function getRandomNumber() {
    const min = 1;
    const max = 1000000;
    const date = new Date();
    const seed = date.getTime();
    const random = Math.random() * seed;
    return Math.floor((random % (max - min + 1)) + min);
}
