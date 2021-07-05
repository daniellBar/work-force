import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TextField, MenuItem, InputLabel, Input, InputAdornment } from '@material-ui/core';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Icon from '@material-ui/core/Icon';
import { cloudinaryService } from '../../services/cloudinaryService.js'
import { saveEmployee } from '../../store/action/employeeActions.js'

const emptyProfileImg = 'https://res.cloudinary.com/dcnijwmki/image/upload/v1614373372/general/guest_it6pn4_p62hcu.jpg'

class _EmployeeEdit extends Component {

    state = {
        employee: {
            name: '',
            salary: 0,
            mail: '',
            position: '',
            group: '',
            imgUrl: null
        }
    }

    componentDidMount() {
        if (this.props.employee) {
            this.setState({ employee: this.props.employee })
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.employee._id !== this.props.employee._id) {
            this.setState({ employee: this.props.employee })
        }
    }

    handleChange = (prop) => async ({ target }) => {
        let value = target.type === 'number' ? +target.value : target.value
        if (prop === 'imgUrl') value = await cloudinaryService.uploadImg(target);
        this.setState({ employee: { ...this.state.employee, [prop]: value } })
    }

    onCancelEdit = () => {
        this.closeEdit()
    }

    onClickSubmit = (e) => {
        e.preventDefault()
        const { loggedInUser } = this.props
        loggedInUser && loggedInUser.isAdmin ? this.handleSubmit() : this.props.openSnackbar()
    }

    handleSubmit = () => {
        let { employee } = this.state
        employee.imgUrl = employee.imgUrl ?? emptyProfileImg
        this.props.saveEmployee(employee)
        this.closeEdit()
    }

    closeEdit = () => {
        this.props.setSelectedEmployee(null)
        this.props.toggleModal()
    }

    moveToPrevNextEmployee = (employee) => {
        this.props.setSelectedEmployee(employee)
    }

    render() {
        const { employee } = this.state
        const groups = ['Wifi', 'Web', 'Algorithms', 'Automation Infra', 'Business', 'Human-Resources']
        return (
            <section className="edit-container">
                <form className="edit-form" onSubmit={this.onClickSubmit}>
                    <div className="edit-info">
                        <div className="edit-info-upper">
                            <div className="edit-profile-pic">
                                <img className={`profile-img ${employee.imgUrl ? 'edit-img' : 'empty-img'}`} src={employee.imgUrl || emptyProfileImg} alt="profile-img" />
                                 <div className={`btn ${employee.imgUrl ? 'add' : 'edit'}-profile-img-btn`}>
                                 <InputLabel htmlFor="file-upload" >
                                    <PhotoCameraIcon style={{ fontSize: 32 }} color="action"/>
                                    <Input type="file" id="file-upload" inputProps={{ accept: "image/*" }} style={{ display: 'none' }} onChange={this.handleChange('imgUrl')} />
                                </InputLabel>
                                 </div>
                 
                            </div>
                            <div className="edit-personal-info">
                                <TextField label="Full Name" type="text" autoComplete="off" onChange={this.handleChange('name')} value={employee.name} />
                                <TextField label="Email" type="text" autoComplete="off" onChange={this.handleChange('mail')} value={employee.mail} />
                                <TextField label="Salary" type="number" autoComplete="off" onChange={this.handleChange('salary')} value={employee.salary}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Icon className="fas fa-shekel-sign" fontSize="small" />
                                            </InputAdornment>
                                        )
                                    }}
                                    inputProps={{ min: "0", max: "100000" }}
                                />

                            </div>
                        </div>

                        <div className="edit-info-lower">
                            <div className="edit-job-info flex column">
                                <TextField
                                    id="select-group"
                                    select
                                    label="Group"
                                    value={employee.group}
                                    onChange={this.handleChange('group')}

                                >
                                    {groups.map((group, idx) => (
                                        <MenuItem key={idx} value={group}>
                                            {group}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField label="Job Title" type="text" autoComplete="off" onChange={this.handleChange('position')} value={employee.position} />

                            </div>
                        </div>
                    </div>

                    <div className="form-btns">
                        <div className="btn save-btn" onClick={this.onClickSubmit}>Save</div>
                        <div className="btn cancel-btn" onClick={this.onCancelEdit}>Cancel</div>
                    </div>

                </form>
                {employee._id && <div className="edit-prev-next-btns">
                    <ArrowBackIcon className="btn btn-prev" onClick={() => this.moveToPrevNextEmployee(employee.prevEmployee)} fontSize="large" />
                    <ArrowForwardIcon className="btn btn-next" onClick={() => this.moveToPrevNextEmployee(employee.nextEmployee)} fontSize="large" />
                </div>}
            </section>
        )
    }

}
const mapStateToProps = state => {
    return {
        loggedInUser: state.userReducer.loggedInUser
    }
}

const mapDispatchToProps = {
    saveEmployee
}

export const EmployeeEdit = connect(mapStateToProps, mapDispatchToProps)(_EmployeeEdit)