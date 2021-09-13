const express = require("express");
const router = express.Router();

var finded = null;

const pool = require("../database");

router.get("/office", async (req, res) => {
  let current = null;
  if (finded !== null) {
    current = {
      c_id: finded[0].id_office,
      c_name: finded[0].name,
      c_address: finded[0].address,
      c_town: finded[0].town,
      c_province: finded[0].province,
      url: "/links/office/delete",
    };
  } else {
    current = {
      c_id: "",
      c_address: "",
      c_town: "",
      c_province: "",
      url: "/links/office",
    };
  }

  const offices = await pool.query("SELECT * FROM office");
  const general = {
    offices,
    current,
  };

  res.render("links/office", { general });
});

/////////////////////////////////////

router.get("/employee", async (req, res) => {
  let current = null;
  if (finded != null) {
    current = {
      c_id: finded[0].id_employee,
      c_fname: finded[0].fname,
      c_lname: finded[0].lname,
      c_salary: finded[0].salary,
      c_idOffice: null,
      c_date: finded[0].date,
      url: "/links/employee/delete",
    };
    if (finded[0].id_office !== null) {
      const office = await pool.query(
        "SELECT * FROM office WHERE id_office = ?",
        [parseInt(finded[0].id_office)]
      );
      current.c_idOffice = office[0].id_office;
    }
  } else {
    current = {
      url: "/links/employee",
    };
  }

  const allEmployees = await pool.query("SELECT * FROM employee");
  let employees = [];

  allEmployees.forEach(async (element) => {
    const office = await pool.query(
      "SELECT * FROM office WHERE id_office = ?",
      [element.id_office]
    );

    if (office.length > 0) {
      employees.push({
        id_employee: element.id_employee,
        fname: element.fname,
        lname: element.lname,
        salary: element.salary,
        id_office: office[0].name,
        date: element.date,
      });
    } else {
      employees.push(element);
    }
  });

  const offices = await pool.query("SELECT * FROM office");
  const general = {
    employees,
    current,
    offices,
  };
  // console.log(office);
  res.render("links/employee", { general });
});

router.get("/reservation", async (req, res) => {
  let current = null;
  if (finded != null) {
    current = {
      c_id: finded[0].id_reservation,
      c_idVehicle: null,
      c_date: finded[0].date,
      c_destination: finded[0].destination,
      c_kilometres: finded[0].kilometres,
      c_idEmployee: null,
      url: "/links/reservation/delete",
    };
    if (finded[0].id_vehicle !== null) {
      const vehicle = await pool.query(
        "SELECT * FROM vehicle WHERE id_vehicle = ?",
        [parseInt(finded[0].id_vehicle)]
      );
      current.c_idVehicle = vehicle[0].id_vehicle;
    }
    if (finded[0].id_employee !== null) {
      const employee = await pool.query(
        "SELECT * FROM employee WHERE id_employee = ?",
        [parseInt(finded[0].id_employee)]
      );
      current.c_idEmployee = employee[0].id_employee;
    }
  } else {
    current = {
      url: "/links/reservation",
    };
  }

  const allReservations = await pool.query("SELECT * FROM reservation");
  let reservations = [];

  for (const reservation of allReservations) {
    if (reservation.id_employee !== null) {
      const employees = await pool.query("SELECT * FROM employee WHERE id_employee = ?", [reservation.id_employee]);
      reservation.id_employee = employees[0].fname + " " + employees[0].lname;
    }
    if (reservation.id_vehicle !== null) {
      const vehicles = await pool.query("SELECT * FROM vehicle WHERE id_vehicle = ?", [reservation.id_vehicle]);
      reservation.id_vehicle = vehicles[0].placa;
    }
    reservations.push(reservation);
 }

  const vehicles = await pool.query("SELECT * FROM vehicle");
  const employees = await pool.query("SELECT * FROM employee");
  const general = {
    reservations,
    current,
    vehicles,
    employees,
  };
  res.render("links/reservation", { general });
});

router.get("/vehicle", async (req, res) => {
  let current = null;
  if (finded != null) {
    current = {
      c_id: finded[0].id_vehicle,
      c_description: finded[0].description,
      url: "/links/vehicle/delete",
    };
  } else {
    current = {
      url: "/links/vehicle",
    };
  }

  const vehicles = await pool.query("SELECT * FROM vehicle");
  const general = {
    vehicles,
    current,
  };

  res.render("links/vehicle", { general });
});

///////////////////////////////////////////////////
// GUARDAR
router.post("/office", async (req, res) => {
  const { id_office, name, address, location, province } = req.body;
  const office = {
    name,
    address,
    town: location,
    province,
  };
  let newAuditory = {
    description: ''
  };

  if (id_office === undefined || isNaN(parseInt(id_office))) {
    await pool.query("INSERT INTO office SET ?", [office]);
    newAuditory.description = `Se ha guardado la oficina ${name} en la dirección ${address}`;
    await pool.query('INSERT INTO auditoria SET ?', [newAuditory]);
  } else {
    await pool.query("UPDATE office SET ? WHERE id_office = ?", [
      office,
      parseInt(id_office),
    ]);
    newAuditory.description = `Se ha actualizado la oficina ${name}`;
    await pool.query('INSERT INTO auditoria SET ?', [newAuditory]);
  }
  res.redirect("/links/office");
});

router.post("/employee", async (req, res) => {
  const { id_employee, fname, lname, salary, officeId, date } = req.body;
  const office = await pool.query("SELECT * FROM office WHERE id_office = ?", [
    parseInt(officeId),
  ]);
  const employee = {
    fname,
    lname,
    salary: parseFloat(salary),
    id_office: office[0].id_office,
    date,
  };
  let newAuditory = {
    description: ''
  };
  if (id_employee === undefined || isNaN(parseInt(id_employee))) {
    await pool.query("INSERT INTO employee SET ?", [employee]);
    newAuditory.description = `Se ha guardado el empleado ${fname} ${lname}`;
    await pool.query('INSERT INTO auditoria SET ?', [newAuditory]);
  } else {
    await poo.query("UPDATE employee SET ? WHERE id_employee = ?", [
      employee,
      parseInt(id_employee),
    ]);
    newAuditory.description = `Se ha actualizado el empleado con ID: ${id_employee}`;
    await pool.query('INSERT INTO auditoria SET ?', [newAuditory]);
  }

  // console.log(employee);

  res.redirect("/links/employee");
});

router.post("/reservation", async (req, res) => {
  const {
    id_reservation,
    vehicleId,
    date,
    destination,
    kilometres,
    employeeId,
  } = req.body;

  const vehicle = await pool.query(
    "SELECT * FROM vehicle WHERE id_vehicle = ?",
    [parseInt(vehicleId)]
  );
  const employee = await pool.query(
    "SELECT * FROM employee WHERE id_employee = ?",
    [parseInt(employeeId)]
  );

  const reservations = {
    id_vehicle: vehicle[0].id_vehicle,
    date,
    destination,
    kilometres: parseInt(kilometres),
    id_employee: employee[0].id_employee,
  };

  let newAuditory = {
    description: ''
  };

  if (id_reservation == undefined || isNaN(parseInt(id_reservation))) {
    await pool.query("INSERT INTO reservation SET ?", [reservations]);
    newAuditory.description = `Se ha guardado una reservacion del empleado ${employee[0].fname} ${employee[0].lname} para el vehiculo con placa ${vehicle[0].placa}`;
    await pool.query('INSERT INTO auditoria SET ?', [newAuditory]);
  } else {
    await pool.query("UPDATE reservation SET ? WHERE id_reservation = ?", [
      reservations,
      parseInt(id_reservation),
    ]);
    newAuditory.description = `Se ha actualizado la reservacion con ID: ${id_reservation}`;
    await pool.query('INSERT INTO auditoria SET ?', [newAuditory]);
  }

  console.log(reservations);
  res.redirect("/links/reservation");
});

router.post("/vehicle", async (req, res) => {
  const { id_vehicle, placa, description } = req.body;
  const vehicles = {
    placa,
    description,
  };

  let newAuditory = {
    description: ''
  };

  if (id_vehicle == undefined || isNaN(parseInt(id_vehicle))) {
    await pool.query("INSERT INTO vehicle SET ?", [vehicles]);
    newAuditory.description = `Se ha guardado un nuevo vehiculo con placa: ${placa}`;
    await pool.query('INSERT INTO auditoria SET ?', [newAuditory]);
  } else {
    await pool.query("UPDATE vehicle SET ? WHERE id_vehicle = ?", [
      vehicles,
      id_vehicle,
    ]);
    newAuditory.description = `Se ha actualizado el vehiculo con con ID: ${id_vehicle}`;
    await pool.query('INSERT INTO auditoria SET ?', [newAuditory]);
  }

  res.redirect("/links/vehicle");
});

//////////////////////////////////////////////////////
//ENCONTRAR

router.get("/office/find/:id", async (req, res) => {
  const { id } = req.params;
  const currentOffice = await pool.query(
    "SELECT * FROM office WHERE id_office = ?",
    [id]
  );
  finded = currentOffice;
  res.redirect("/links/office");
});

router.get("/employee/find/:id", async (req, res) => {
  const { id } = req.params;
  const currentEmployee = await pool.query(
    "SELECT * FROM employee WHERE id_employee = ?",
    [id]
  );
  finded = currentEmployee;
  res.redirect("/links/employee");
  // res.send('encontrado');
});

router.get("/reservation/find/:id", async (req, res) => {
  const { id } = req.params;
  const currentReservation = await pool.query(
    "SELECT * FROM reservation WHERE id_reservation = ?",
    [id]
  );
  finded = currentReservation;
  res.redirect("/links/reservation");
  // res.send('encontrado');
});

router.get("/vehicle/find/:id", async (req, res) => {
  const { id } = req.params;
  const currentVehicle = await pool.query(
    "SELECT * FROM vehicle WHERE id_vehicle = ?",
    [id]
  );
  finded = currentVehicle;
  res.redirect("/links/vehicle");
  // res.send('encontrado');
});

//////////////////////////////////////////////////////
// LIMPIAR
router.get("/clean/office", async (req, res) => {
  finded = null;
  res.redirect("/links/office");
});

router.get("/clean/employee", async (req, res) => {
  finded = null;
  res.redirect("/links/employee");
});

router.get("/clean/reservation", async (req, res) => {
  finded = null;
  res.redirect("/links/reservation");
});

router.get("/clean/vehicle", async (req, res) => {
  finded = null;
  res.redirect("/links/vehicle");
});

///////////////////////////////////////////////////////////
//ELIMINAR
router.post("/office/delete/:id", async (req, res) => {
  const { id } = req.params;
  // const actual = await pool.query('SELECT * FROM office WHERE id_office = ?', [id]);
  let newAuditory = {
    description: ''
  };

  const officess = await pool.query('SELECT * FROM office WHERE id_office = ?', [id]);

  newAuditory.description = `Se ha eliminado la oficina de ${offices[0].name}con ID: ${offices[0].id_office}`;
  await pool.query('INSERT INTO auditoria SET ?', [newAuditory]);
  await pool.query("DELETE FROM office WHERE id_office = ?", [id]);
 
  // console.log(actual);
  finded = null;
  res.redirect("/links/office");
});

router.post("/employee/delete/:id", async (req, res) => {
  const { id } = req.params;

  let newAuditory = {
    description: ''
  };

  const employees = await pool.query('SELECT * FROM employee WHERE id_employee = ?', [id]);

  newAuditory.description = `Se ha eliminado el empleado ${employees[0].name} ${employees[0].lname} con ID: ${employees[0].id_employee}`;
  await pool.query('INSERT INTO auditoria SET ?', [newAuditory]);
  await pool.query("DELETE FROM employee WHERE id_employee = ?", [id]);
  // console.log(actual);
  finded = null;
  res.redirect("/links/employee");
});

router.post("/reservation/delete/:id", async (req, res) => {
  const { id } = req.params;
  let newAuditory = {
    description: ''
  };

  const reservations = await pool.query('SELECT * FROM reservation WHERE id_reservation = ?', [id]);

  const employees = await pool.query('SELECT * FROM employee WHERE id_employee = ?', [reservations[0].id_employee]);

  const vehicles = await pool.query('SELECT * FROM vehicle WHERE id_vehicle = ?', [reservations[0].id_vehicle]);

  newAuditory.description = `Se ha eliminado la reservacion de de ${employees[0].fname} ${employees[0].lname} para el vehiculo con placa ${vehicles[0].placa}`;
  await pool.query('INSERT INTO auditoria SET ?', [newAuditory]);

  await pool.query("DELETE FROM reservation WHERE id_reservation = ?", [id]);
  // console.log(actual);
  finded = null;
  res.redirect("/links/reservation");
});

router.post("/vehicle/delete/:id", async (req, res) => {
  const { id } = req.params;
  let newAuditory = {
    description: ''
  };

  const vehicles = await pool.query('SELECT * FROM vehicle WHERE id_vehicle = ?', [id]);

  newAuditory.description = `Se ha eliminado el vehiculo con placa ${vehicles[0].placa} con ID: ${vehicles[0].id_vehicle}`;
  await pool.query('INSERT INTO auditoria SET ?', [newAuditory]);
  await pool.query("DELETE FROM vehicle WHERE id_vehicle = ?", [id]);
  // console.log(actual);
  finded = null;
  res.redirect("/links/vehicle");
});

module.exports = router;
