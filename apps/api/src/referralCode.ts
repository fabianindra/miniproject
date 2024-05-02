function generateReferralCode() {
    const alphanum = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
    let referralCode = '';
    for(let i = 0; i < 6; i++) {
        referralCode += alphanum.charAt(Math.floor(Math.random() * alphanum.length))
    }
    return referralCode;
}

export default generateReferralCode