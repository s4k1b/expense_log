export const chartMixin = {
  methods: {
    calculateChart(participants, iPaid, iNeedToPay) {
      // console.log("participants: ", participants);
      console.log("my pay: ", iPaid, " ", iNeedToPay);
      let takers = [];
      let givers = [];

      if (Number(iPaid) >= Number(iNeedToPay)) {
        console.log("ipaid: ", iPaid, " need to pay: ", iNeedToPay);
        takers.push({ name: "Me", amount: iPaid - iNeedToPay });
      } else {
        givers.push({ name: "Me", amount: iNeedToPay - iPaid });
      }
      for (let participant of participants) {
        const paid = participant.paid;
        const needToPay = participant.needToPay;

        // console.log(
        //   "participant: ",
        //   participant.name,
        //   " paid: ",
        //   paid,
        //   " need to pay: ",
        //   needToPay
        // );

        if (paid >= needToPay)
          takers.push({
            name: participant.userInfo.userId,
            amount: paid - needToPay
          });
        else
          givers.push({
            name: participant.userInfo.userId,
            amount: needToPay - paid
          });
      }

      takers.sort((t1, t2) => {
        if (t1.amount > t2.amount) return 1;
        else if (t1.amount < t2.amount) return -1;
        else return 0;
      });

      givers.sort((g1, g2) => {
        if (g1.amount > g2.amount) return -1;
        else if (g1.amount < g2.amount) return 1;
        else return 0;
      });

      console.log("takers: ", takers);
      console.log("givers: ", givers);

      let chart = {};

      participants.forEach(
        participant => (chart[participant.userInfo.userId] = {})
      );
      chart["Me"] = {};

      console.log(chart);

      for (let giver of givers) {
        let fnd = false;
        for (let taker of takers) {
          if (taker.amount >= giver.amount) {
            fnd = true;
            chart[giver.name][taker.name] = giver.amount;
            taker.amount = taker.amount - giver.amount;
            giver.amount = 0;
            break;
          }
        }

        console.log("giver: ", giver, " takers: ", takers);

        if (!fnd) {
          for (let i = takers.length - 1; i >= 0; i--) {
            if (takers[i].amount < giver.amount) {
              chart[giver.name][takers[i].name] = takers[i].amount;
              giver.amount = giver.amount - takers[i].amount;
              takers[i].amount = 0;
            } else {
              chart[giver.name][takers[i].name] = giver.amount;
              takers[i].amount = takers[i].amount - giver.amount;
              giver.amount = 0;
              break;
            }
          }
        }

        takers.sort((t1, t2) => {
          if (t1.amount > t2.amount) return 1;
          else if (t1.amount < t2.amount) return -1;
          else return 0;
        });
      }

      console.log("chart: ", chart);

      let unHandled = {};

      for (let giver of givers) {
        if (giver.amount != 0) {
          unHandled[giver.name] = giver.amount;
        }
      }

      for (let taker of takers) {
        if (taker.amount != 0) {
          unHandled[taker.name] = taker.amount;
        }
      }

      console.log("unHandled: ", unHandled);

      return Object.assign(chart, { unHandled });
    }
  }
};
