const express = require("express");
const router = express.Router();

var finded = null;

const pool = require("../database");

router.get("/office", async (req, res) => {
  let current = null;
  if (finded !== null) {
    current = {
      c_id: finded[0].id_office,
      c_address: finded[0].address,
      c_town: finded[0].town,
			c_province: finded[0].province,
			url: '/links/office/delete'
    };
  } else {
    current = {
      c_id: "",
      c_address: "",
      c_town: "",
			c_province: "",
			url: '/links/office'
    };
  }

  const offices = await pool.query("SELECT * FROM office");
  const general = {
    offices,
    current,
  };

  res.render("links/office", { general });
});

router.get("/employee", async (req, res) => {
  let current = null;
  if (finded != null) {
    current = {
      c_id: finded[0].id_employee,
      c_fname: finded[0].fname,
      c_lname: finded[0].lname,
      c_salary: finded[0].salary,
      c_idOffice: finded[0].id_office,
			c_date: finded[0].date,
			url: '/links/employee/delete'
    };
	} else {
		current = {
			url: '/links/employee'
		};
	};

  const employees = await pool.query("SELECT * FROM employee");
  const general = {
    employees,
    current,
  };

  res.render("links/employee", { general });
});

router.get("/reservation", async (req, res) => {
  let current = null;
  if (finded != null) {
    current = {
      c_id: finded[0].id_reservation,
      c_idVehicle: finded[0].id_vehicle,
      c_date: finded[0].date,
      c_destination: finded[0].destination,
      c_kilometres: finded[0].kilometres,
			c_idEmployee: finded[0].employee,
			url: '/links/reservation/delete'
    };
	} else {
		current = {
			url: '/links/reservation'
		};
	};

  const reservations = await pool.query("SELECT * FROM reservation");
  const general = {
    reservations,
    current,
  };
  res.render("links/reservation", { general });
});

router.get("/vehicle", async (req, res) => {
  let current = null;
  if (finded != null) {
    current = {
      c_id: finded[0].id_vehicle,
			c_description: finded[0].description,
			url: '/links/vehicle/delete'
    };
	} else {
		current = {
			url: '/links/vehicle'
		}
	};

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
  const { id_office, address, location, province } = req.body;
	const office = {
    address,
    town: location,
    province,
	};
	if (id_office === undefined || isNaN(parseInt(id_office))) {
		await pool.query("INSERT INTO office SET ?", [office]);
	} else {
		await pool.query('UPDATE office SET ? WHERE id_office = ?', [office, parseInt(id_office)]);
	}
  
  res.redirect("/links/office");
});

router.post("/employee", async (req, res) => {
  const { id_employee, fname, lname, salary, id_office, date } = req.body;
  const employee = {
    fname,
    lname,
    salary: parseFloat(salary),
    id_office: null,
    date,
  };
	if (id_employee === undefined || isNaN(parseInt(id_employee))) {
		await pool.query("INSERT INTO employee SET ?", [employee]);
	} else {
		await poo.query('UPDATE employee SET ? WHERE id_employee = ?', [employee, parseInt(id_employee)]);
	}
  
  res.redirect("/links/employee");
});

router.post("/reservation", async (req, res) => {
  const { id_reservation, id_vehicle, date, destination, kilometres, id_employee } = req.body;
  const reservations = {
    id_vehicle: null,
    date,
    destination,
    kilometres: parseInt(kilometres),
    id_employee: null,
  };
	if (id_reservation == undefined || isNaN(parseInt(id_reservation))) {
		await pool.query("INSERT INTO reservation SET ?", [reservations]);
	} else {
		await pool.query('UPDATE reservation SET ? WHERE id_reservation = ?', [reservations, parseInt(id_reservation)]);
	}

  res.redirect("/links/reservation");
});

router.post("/vehicle", async (req, res) => {
  const { id_vehicle, description } = req.body;
  const vehicles = {
    description,
  };
	if (id_vehicle == undefined || isNaN(parseInt(id_vehicle))) {
		await pool.query("INSERT INTO vehicle SET ?", [vehicles]);
	} else {
		await pool.query('UPDATE vehicle SET ? WHERE id_vehicle = ?', [vehicles, id_vehicle]);
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
  await pool.query("DELETE FROM office WHERE id_office = ?", [id]);
  // console.log(actual);
  finded = null;
  res.redirect("/links/office");
});

router.post("/employee/delete/:id", async (req, res) => {
  const { id } = req.params;
  // const actual = await pool.query('SELECT * FROM office WHERE id_office = ?', [id]);
  await pool.query("DELETE FROM employee WHERE id_employee = ?", [id]);
  // console.log(actual);
  finded = null;
  res.redirect("/links/employee");
});

router.post("/reservation/delete/:id", async (req, res) => {
  const { id } = req.params;
  // const actual = await pool.query('SELECT * FROM office WHERE id_office = ?', [id]);
  await pool.query("DELETE FROM reservation WHERE id_reservation = ?", [id]);
  // console.log(actual);
  finded = null;
  res.redirect("/links/reservation");
});

router.post("/vehicle/delete/:id", async (req, res) => {
  const { id } = req.params;
  // const actual = await pool.query('SELECT * FROM office WHERE id_office = ?', [id]);
  await pool.query("DELETE FROM vehicle WHERE id_vehicle = ?", [id]);
  // console.log(actual);
  finded = null;
  res.redirect("/links/vehicle");
});

module.exports = router;
